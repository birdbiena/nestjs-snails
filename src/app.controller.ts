import { Body, Controller, Get, Post, Render, Request, Response, UseFilters, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthenticatedGuard } from './auth/guard/authenticated.guard';
import { LocalAuthGuard } from './auth/guard/local-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ViewAuthFilter } from './filters/view-auth.filter';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  login(@Response() res, @Body() user: LoginUserDto) {
    res.redirect('/');
  }

  @Post('auth/register')
  async register(@Body() user: CreateUserDto) {
    const newUser = await this.authService.register(user);

    return {
      msg: '',
      user: {
        id: newUser.id
      }
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('protected')
  getHello(@Request() req): string {
    return req.user;
  }

  @Get('/')
  @UseGuards(AuthenticatedGuard)
  @UseFilters(ViewAuthFilter)
  @Render('home')
  home(@Request() req): any {
    return { title: `Light-Snails` };
  }

  @Get('login')
  @Render('login')
  loginUI(@Request() req, @Response() res): any {
    if (req.user) {
      res.redirect('/');
    }

    return { title: 'Login' };
  }

  @Get('logout')
  logout(@Request() req): any {
    req.session.destroy();
    return { msg: 'The user session has ended' };
  }

  @Get('register')
  @Render('registers')
  registerUI(): any {
    return { title: 'Register' };
  }

  @Get('find')
  async findAll(@Response() res): Promise<any> {
    res.json(await this.usersService.findAll());
  }
}
