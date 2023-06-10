import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { OperationsService, RequestStructure, ResponseStructure } from '../../shared';

import { Products } from '../entities';


@Injectable()
export class ReadProducts {

  constructor(
    @InjectRepository(Products)
    private readonly repository: Repository<Products>,
    private readonly operationsService: OperationsService,
  ) {
    this.operationsService.registerOperation('get_products', this.getProducts());
    this.operationsService.registerOperation('get_recommended_products', this.getRecommendedProducts());
    this.operationsService.registerOperation('get_product_by_id', this.getProductById());
    this.operationsService.registerOperation('get_products_by_subcategory', this.getProductsBySubcategory());
    this.operationsService.registerOperation('get_products_by_group', this.getProductsByGroup());
    this.operationsService.registerOperation('get_products_by_name', this.getProductsByName());
    this.operationsService.registerOperation('get_recommended_products_by_subcategory', this.getRandomProductsBySubcategory());
  }


  private getProducts(): (data: RequestStructure) => Promise<ResponseStructure> {
    return () => {
      return new Promise((resolve) => {
        this.repository.find().then((data: Array<Products>) => {
          const dataToReturn = new ResponseStructure('success', data);
          resolve(dataToReturn);
        }).catch((err) => {
          console.log(err);
          const errorResponse = new ResponseStructure('alert-popup', {message: `Operation "get_products" failed!`});
          resolve(errorResponse);
        });

        return resolve;
      });
    }
  }


  private getRecommendedProducts(): (data: RequestStructure) => Promise<ResponseStructure> {
    return () => {
      return new Promise((resolve) => {
        this.repository.createQueryBuilder().select().orderBy('RAND()').take(8).getMany()
          .then((data: Array<Products>) => {
          const dataToReturn = new ResponseStructure('success', data);
          resolve(dataToReturn);
        }).catch((err) => {
          console.log(err);
          const errorResponse = new ResponseStructure('alert-popup', {message: `Operation "get_products" failed!`});
          resolve(errorResponse);
        });

        return resolve;
      });
    }
  }


  private getProductById(): (data: RequestStructure) => Promise<ResponseStructure> {
    return (dataReceived) => {
      return new Promise((resolve) => {
        this.repository.find({where: {id: dataReceived.payload.productId}, take: 1}).then((data: Array<Products>) => {
          const dataToReturn = new ResponseStructure('success', data);
          resolve(dataToReturn);
        }).catch((err) => {
          console.log(err);
          const errorResponse = new ResponseStructure('alert-popup', {message: `Operation "get_product_by_id" failed!`});
          resolve(errorResponse);
        });

        return resolve;
      });
    }
  }


  private getProductsBySubcategory(): (data: RequestStructure) => Promise<ResponseStructure> {
    return (dataReceived) => {
      return new Promise((resolve) => {
        this.repository.find({where: {subcategoryId: dataReceived.payload.id}}).then((data: Array<Products>) => {
          const dataToReturn = new ResponseStructure('success', data);
          resolve(dataToReturn);
        }).catch((err) => {
          console.log(err);
          const errorResponse = new ResponseStructure('alert-popup', {message: `Operation "get_products_by_subcategory" failed!`});
          resolve(errorResponse);
        });

        return resolve;
      });
    }
  }


  private getProductsByGroup(): (data: RequestStructure) => Promise<ResponseStructure> {
    return (dataReceived) => {
      return new Promise((resolve) => {
        this.repository.find({where: {groupId: dataReceived.payload.id}, take: 8}).then((data: Array<Products>) => {
          const dataToReturn = new ResponseStructure('success', data);
          resolve(dataToReturn);
        }).catch((err) => {
          console.log(err);
          const errorResponse = new ResponseStructure('alert-popup', {message: `Operation "get_products_by_subcategory" failed!`});
          resolve(errorResponse);
        });

        return resolve;
      });
    }
  }


  private getProductsByName(): (data: RequestStructure) => Promise<ResponseStructure> {
    return (dataReceived) => {
      return new Promise((resolve) => {
        console.log(dataReceived.payload.productName);
        this.repository.find({where: {name: Like('%' + dataReceived.payload.productName + '%')}}).then((data: Array<Products>) => {
          const dataToReturn = new ResponseStructure('success', data);
          console.log(dataToReturn);
          resolve(dataToReturn);
        }).catch((err) => {
          console.log(err);
          const errorResponse = new ResponseStructure('alert-popup', {message: `Operation "get_products_by_name" failed!`});
          resolve(errorResponse);
        });

        return resolve;
      });
    }
  }


  private getRandomProductsBySubcategory(): (data: RequestStructure) => Promise<ResponseStructure> {
    return (dataReceived) => {
      return new Promise((resolve) => {
        this.repository.createQueryBuilder()
          .select()
          .where('subcategoryId = :subcategoryId && id <> :id', { subcategoryId: dataReceived.payload.subcategoryId, id: dataReceived.payload.productId })
          .orderBy('RAND()').take(4).getMany()
          .then((data: Array<Products>) => {
            const dataToReturn = new ResponseStructure('success', data);
            resolve(dataToReturn);
          }).catch((err) => {
          console.log(err);
          const errorResponse = new ResponseStructure('alert-popup', {message: `Operation "get_products" failed!`});
          resolve(errorResponse);
        });

        return resolve;
      });
    }
  }

}
