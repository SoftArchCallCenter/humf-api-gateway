import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  Empty,
  CreateMenuDto, 
  Menu, 
  MenuId, 
  MenuList, 
  MenuServiceClient, 
  UpdateMenuDto,
  RestaurantId
} from '../../humf-proto/build/proto/menu'
import { Observable } from 'rxjs';

@Injectable()
export class MenuService implements OnModuleInit {

  private menuService: MenuServiceClient;

  constructor(@Inject('MENU_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.menuService = this.client.getService<MenuServiceClient>("MenuService")
  }

  findAll(): Observable<MenuList>{
    return this.menuService.getAllMenu({})
  }

  findOne(menuId: MenuId): Observable<Menu>{
    return this.menuService.getMenu(menuId)
  }

  findAllByRestaurant(resId: RestaurantId): Observable<MenuList>{
    console.log(resId)
    return this.menuService.getAllMenuByRestaurant(resId)
  }

  create(createMenuDto: CreateMenuDto): Observable<Menu>{
    return this.menuService.createMenu(createMenuDto)
  }

  update(updateMenuDto: UpdateMenuDto): Observable<Menu>{
    return this.menuService.updateMenu(updateMenuDto)
  }

  remove(menuId: MenuId): Observable<Empty>{
    return this.menuService.deleteMenu(menuId)
  }
}
