import { Controller, Get, Post, Render, Request, Response, UseFilters, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthenticatedGuard } from './auth/guard/authenticated.guard';
import { LocalAuthGuard } from './auth/guard/local-auth.guard';
import { ViewAuthFilter } from './filters/view-auth.filter';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  login(@Request() req, @Response() res) {
    res.redirect('/');
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
}
