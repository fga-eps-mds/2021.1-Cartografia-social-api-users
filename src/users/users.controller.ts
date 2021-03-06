import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEnum } from './entities/user.entity';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('createResearcher')
  async createResearcher(@Payload() createUserDto: CreateUserDto) {
    const id = await this.usersService.create(
      createUserDto,
      UserEnum.RESEARCHER,
    );

    return { id };
  }

  @MessagePattern('createCommunityMember')
  async createCommunityMember(@Payload() createUserDto: CreateUserDto) {
    const id = await this.usersService.create(
      createUserDto,
      UserEnum.COMMUNITY_MEMBER,
    );

    return { id };
  }

  @MessagePattern('getUserData')
  async getUserData(@Payload() email: string) {
    const response = await this.usersService.getUserByEmail(email);

    return response.toJSON();
  }
}
