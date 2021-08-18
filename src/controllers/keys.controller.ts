import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import NotFoundError from '../errors/not-found.error';
import BaseController from './_base.controller';

class KeysController extends BaseController {
  // Get keys
  public getAll = async (req: Request, res: Response) => {
    const user = req.currentUser?.id;
    const keys = this.db.keys.findMany({
      where: {
        user_id: user,
        deleted: false
      }
    });
    if (!keys) throw new NotFoundError();
    res.status(200).send(keys);
  };

  // Get one key
  public getOne = async (req: Request, res: Response) => {
    const user = req.currentUser?.id;
    const { id } = req.params!;
    const key = this.db.keys.findFirst({
      where: {
        user_id: user,
        id: parseInt(id),
        deleted: false
      }
    });
    if (!key) throw new NotFoundError();
    res.status(200).send(key);
  };

  // Get keys apply filters
  public search = async (req: Request, res: Response) => {
    const user = req.currentUser?.id;
    const query = req.query;
    const numPage = parseInt(query.page as string) || 1;
    const perPage = parseInt(query.per_page as string) || 10;
    const numSkip = perPage * numPage - perPage;
    const name = (query.name as string) || '';
    const description = (query.description as string) || '';
    const category = parseInt(query.category as string) || 0;
    const url = (query.url as string) || '';
    const access = (query.access as Array<String>) || [];
  };

  // Create key
  public create = async (req: Request, res: Response) => {};

  // Update key info
  public update = async (req: Request, res: Response) => {};

  // Delete (logic) key
  public delete = async (req: Request, res: Response) => {};

  // Delete (db) key
  public remove = async (req: Request, res: Response) => {};
}

export default KeysController;
