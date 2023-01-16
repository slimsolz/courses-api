import { LessonInputDto } from './dto/lesson.input.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LessonEntity } from './lesson.entity';
import { v4 as uuid } from 'uuid';
import { AssignStudentsToLessonInputDto } from './dto/assignStudentsToLessonInput.dto';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(LessonEntity)
    private lessonRepository: Repository<LessonEntity>,
  ) {}

  async createLesson(createLessonInput: LessonInputDto): Promise<LessonEntity> {
    const lesson = this.lessonRepository.create({
      id: uuid(),
      ...createLessonInput,
    });

    return await this.lessonRepository.save(lesson);
  }

  async getLesson(id: string): Promise<LessonEntity> {
    return await this.lessonRepository.findOneBy({ id });
  }

  async getLessons(): Promise<LessonEntity[]> {
    return await this.lessonRepository.find({});
  }

  async assignStudentsToLesson(
    assignStudentsToLessonInput: AssignStudentsToLessonInputDto,
  ): Promise<LessonEntity> {
    const { lessonId, studentsIds } = assignStudentsToLessonInput;
    const lesson = await this.lessonRepository.findOneBy({ id: lessonId });
    lesson.students = [...lesson.students, ...studentsIds];
    return this.lessonRepository.save(lesson);
  }
}
