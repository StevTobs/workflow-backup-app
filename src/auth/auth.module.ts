import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from "./local.strategy";
import { User } from "./user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.AUTH_SECRET,
        signOptions: {
          expiresIn: '6m'
        }
      })
    })
  ],
  providers: [LocalStrategy, JwtStrategy, AuthService],
  controllers: [AuthController]
})
export class AuthModule { }