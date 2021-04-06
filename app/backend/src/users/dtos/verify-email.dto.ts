import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'common/dtos/output.dto';
import { Verification } from 'users/entities/verification.entity';

@ObjectType()
export class VerifyEmailOutput extends CoreOutput {}

@InputType()
export class VerifyEmailInput extends PickType(Verification, ['code']) {}
