import { Field, InputType, ID } from '@nestjs/graphql';
import { IsDateString, MinLength, IsUUID } from 'class-validator';

@InputType()
export class LessonInputDto {
  @Field()
  @MinLength(1)
  name: string;

  @Field()
  @IsDateString()
  startDate: string;

  @Field()
  @IsDateString()
  endDate: string;

  @IsUUID('4', { each: true })
  @Field(() => [ID], { defaultValue: [] })
  students: string[];
}
