import { StudentInputDto } from './dto/student-input.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentEntity } from './student.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>,
  ) {}

  async createStudent(studentInput: StudentInputDto): Promise<StudentEntity> {
    const student = this.studentRepository.create({
      id: uuid(),
      ...studentInput,
    });

    return await this.studentRepository.save(student);
  }

  async getStudent(id: string): Promise<StudentEntity> {
    const student = await this.studentRepository.findOneBy({ id });

    if (!student) {
      throw new NotFoundException();
    }

    return student;
  }

  async getAllStudents(): Promise<StudentEntity[]> {
    return await this.studentRepository.find({});
  }

  async getManyStudents(studentIds: string[]): Promise<StudentEntity[]> {
    return this.studentRepository.find({
      where: {
        id: {
          $in: studentIds,
        } as any,
      },
    });
  }
}
