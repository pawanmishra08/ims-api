import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from 'src/helpers/public';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService : JwtService,
    private readonly reflector : Reflector,
  ){}
   async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>{
    try{
      const ispublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY,[
        context.getHandler(),
        context.getClass(),
      ]);

      if(ispublic){
        return true;
      }
      const request = context.switchToHttp().getRequest();
      const [ type, token ] = request.headers.authorization?.split(' ') ?? [];

      if (type !== "Bearer" || !token){
        throw new UnauthorizedException();
      }

      const payload = await this.jwtService.verifyAsync(
        token, { secret: process.env.SECRET_KEY },
      );

      request['payload'] = payload;
    }
    catch(err) {
      throw new UnauthorizedException(err);
    }
    return true;
  }

}
