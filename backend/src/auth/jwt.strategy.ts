import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { user_model, user } from "./schema/user.schema";
import { Model } from "mongoose";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(user_model)
    private readonly userModel: Model<user>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.jwt_secret,
    });
  }

  async validate(payload: any) {
    const { _id } = payload;
    const userInfo = await this.userModel.findById(_id);

    if (!userInfo) {
      throw new UnauthorizedException('Unauthorized, Login First');
    }

    return userInfo;
  }
}
