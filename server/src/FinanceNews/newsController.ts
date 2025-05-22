import { NextFunction, Request, Response } from 'express';
import { prisma } from '../../prisma/client';
import createHttpError from 'http-errors';
import axios from 'axios';


const getAllNews = async (req: Request, res: Response, next: NextFunction) => {

    const options = {
        method: 'GET',
        url: 'https://yahoo-finance15.p.rapidapi.com/api/v2/markets/news',
        params: {type: 'ALL'},
        headers: {
          'x-rapidapi-key': process.env.RAPIDAPI_KEY,
          'x-rapidapi-host': 'yahoo-finance15.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        res.status(200).json({
            status: 'success', data: response.data
        });
		
    } catch (err) {
      console.log(err);
      return next(createHttpError(500, 'Error while processing your request'));
    }
  };



  const getNewsSentiment = async (req: Request, res: Response, next: NextFunction) => {

    const { url } = req.query;
    console.log(url);

    try {

      const response = await axios.get('http://localhost:8000/api/v1/news/sentiment', {
        params: { url }
      });

     
        res.status(200).json({
            status: 'success', data: response.data
        });
		
    } catch (err) {
      console.log(err);
      return next(createHttpError(500, 'Error while processing your request'));
    }
  };




export { getAllNews, getNewsSentiment };