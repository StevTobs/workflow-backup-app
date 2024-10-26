import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { Strategy } from "passport-local";
import { Repository } from "typeorm";
import { User } from "./user.entity";
// import { UserDto } from "./user.dto"; // Assuming you have a UserDto defined

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
    super();
  }


  public async validate(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { username },
    });
  
    if (!user) {
      this.logger.debug(`User ${username} not found!`);
      throw new UnauthorizedException('User not found');
    }
  
    // Compare the provided password with the hashed password in the database
    const isPasswordValid = password=== user.password;
    if (!isPasswordValid) {
      this.logger.debug(`Invalid credentials for user ${username}`);
      throw new UnauthorizedException('Invalid credentials');
    }
  
    return user; // Return the user object if everything is valid
  }
}
