import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your_jwt_secret', // Ensure this matches the secret used to sign the token
    });
  }

  async validate(payload: any) {
    // Ensure you provide selection conditions based on the payload
    const user = await this.userRepository.findOne({
      where: { id: payload.sub }, // Use the subject (sub) from the JWT payload
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user; // Return the user if found
  }
}
