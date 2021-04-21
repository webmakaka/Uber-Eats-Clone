import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'common/dtos/output.dto';
import { Payment } from 'payments/entities/payment.entity';

@ObjectType()
export class GetPaymentsOutput extends CoreOutput {
  @Field((type) => [Payment], { nullable: true })
  payments?: Payment[];
}
