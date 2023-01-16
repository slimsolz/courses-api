import { StudentResolver } from './student.resolver';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './student.entity';
import { StudentService } from './student.service';

@Module({
  imports: [TypeOrmModule.forFeature([StudentEntity])],
  providers: [StudentService, StudentResolver],
  exports: [StudentService],
})
export class StudentModule {}
