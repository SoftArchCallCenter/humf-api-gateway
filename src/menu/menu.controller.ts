import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from 'humf-proto/build/proto/menu';
import { MenuUpdateField } from './entities/menu.entity';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Get()
  findAll(){
    return this.menuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.menuService.findOne({id : +id});
  }

  @Get('/res/:id')
  findAllbyRestaurant(@Param('id') id: number){
    return this.menuService.findAllByRestaurant({id : +id})
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() menuUpdateField: MenuUpdateField) {
    return this.menuService.update({id : +id , ...menuUpdateField});
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.menuService.remove({id : +id});
  }

}
