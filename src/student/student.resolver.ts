import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentInputDto } from './dto/student-input.dto';
import { StudentService } from './student.service';
import { StudentType } from './student.type';

@Resolver((of) => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Mutation((returns) => StudentType)
  createStudent(@Args('studentInput') studentInput: StudentInputDto) {
    return this.studentService.createStudent(studentInput);
  }

  @Query((returns) => StudentType)
  getStudent(@Args('id') id: string) {
    return this.studentService.getStudent(id);
  }

  @Query((returns) => [StudentType])
  getAllStudents() {
    return this.studentService.getAllStudents();
  }
}
