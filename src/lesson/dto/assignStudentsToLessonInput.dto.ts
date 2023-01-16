import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class AssignStudentsToLessonInputDto {
  @Field((type) => ID)
  @IsUUID()
  lessonId: string;

  @Field((type) => [ID])
  @IsUUID('4', { each: true })
  studentsIds: string[];
}
