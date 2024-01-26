import mongoose from "mongoose";
import "reflect-metadata";
import { DatabaseError } from "../errors/database.error";
import { env } from "../config/env.config";
import LoggerService from "../services/logger.service";
import { container } from "tsyringe";
require("dotenv").config();

const logger = container.resolve(LoggerService);

const connectToDB = async () => {
    mongoose.set("strictQuery", false);
    mongoose.connect(`${env.DATABASE.URI}`).then((res: any) => {
        const message = "Successfully connected to DB";
        logger.info(message);
    }).catch((err: any)=> {
        logger.error(err);
    });
};

const createData =  (model: any, data: any) => {
    try{
        return model.create(data);
    }catch(err){
        return err;
    }
};

const readData = (model: any, data: any, select?: any) => {
    try{

        return model.find(data, select).sort({ created_at: -1 });

    }catch(err: any){

        return err.message;

    }
};

const readsingleData = (model: any, data: any, select?: any) => {
    try{

        return model.findOne(data, select);

    }catch(err: any){

        return err.message;

    }
};

const updateData = (model: any, keyword: any, data: any) => {
    try{

        return model.findOneAndUpdate(keyword, data);

    }catch(err: any){
        return err.message;
    }
};

const updateManyData = (model: any, keyword: any, data: any) => {
    try{

        return model.updateMany(keyword, data);

    }catch(err: any){
        return err.message;
    }
};

const deleteData = (model: any, keyword: any) => {
    try{

        return model.findByIdAndRemove(keyword);

    }catch(err: any){
    
        return err.message;
    
    }
};

export {
    connectToDB,
    createData,
    readData,
    readsingleData,
    updateData,
    updateManyData,
    deleteData
};