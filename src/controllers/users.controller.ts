import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import jwt from 'jsonwebtoken';
import BaseController from './_base.controller';
import MailService from '../services/mail.service';

const mailService = new MailService();
class UsersController extends BaseController {
  private saltRounds = 10;
  // Get user info by id
  public getOne = async (req: Request, res: Response) => {
    const { id } = req.currentUser!;
    const user = await this.db.users.findFirst({
      select: {
        name: true,
        last_name: true,
        maternal_name: true,
        email: true,
        phone: true,
        password: true,
        deleted: true
      },
      where: { id, status_id: 1, deleted: false }
    });
    res.status(200).send(user);
  };

  // Create user
  public create = async (req: Request, res: Response) => {
    const tokenConfirmation: string = await bcrypt.hash(v4(), this.saltRounds);
    const tokenKeys: string = await bcrypt.hash(v4(), this.saltRounds);
    const password: string = await bcrypt.hash(
      req.body.password,
      this.saltRounds
    );
    const subject = 'Mono Access email confirmation';
    const confirmationRoute =
      process.env.URL_COMPLETE +
      '/users/confirmation/' +
      encodeURIComponent(tokenConfirmation);
    const emailContent = `Welcome to Mono Access, please click in the below link to confirm your email address:
    ${confirmationRoute}`;
    const data = {
      name: req.body.name,
      email: req.body.email,
      password,
      token_confirmation: tokenConfirmation,
      token_keys: tokenKeys,
      status_id: 1,
      last_name: req.body.last_name || undefined,
      maternal_name: req.body.maternal_name || undefined,
      phone: req.body.phone || undefined
    };
    const user = await this.db.users.create({
      data
    });
    await mailService.sendMail(user.email, subject, emailContent);
    res.status(201).send(user);
  };

  // Enable user
  public enable = async (req: Request, res: Response) => {
    const token = decodeURIComponent(req.params.token!);
    await this.db.users.updateMany({
      where: {
        token_confirmation: token
      },
      data: {
        token_confirmation: '',
        status_id: 2
      }
    });
    res.status(200).send('User enabled');
  };

  // Login user
  public login = async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await this.db.users.findFirst({
      select: {
        id: true,
        name: true,
        last_name: true,
        maternal_name: true,
        phone: true,
        email: true,
        token_confirmation: true
      },
      where: { email, status_id: 2, deleted: false }
    });
    const sessionJwt = jwt.sign(user!, process.env.JWT_KEY!, {
      expiresIn: process.env.JWT_EXPIRATION_TIME!
    });
    res.status(200).send({ token: sessionJwt });
  };

  // Edit user
  public update = async (req: Request, res: Response) => {
    const { id } = req.currentUser!;
    const data = {
      name: req.body.name || undefined,
      last_name: req.body.last_name || undefined,
      maternal_name: req.body.maternal_name || undefined,
      phone: req.body.phone || undefined
    };

    const user = await this.db.users.update({
      where: { id },
      data
    });
    res.status(200).send(user);
  };

  // Restore password
  public restorePassword = async (req: Request, res: Response) => {
    const { id } = req.currentUser!;
    const password: string = await bcrypt.hash(
      req.body.password,
      this.saltRounds
    );
    const passwordUpdated = await this.db.users.update({
      where: { id },
      data: { password }
    });
    res.status(200).send(passwordUpdated);
  };

  // Logic delete user
  public delete = async (req: Request, res: Response) => {
    const { id } = req.currentUser!;

    const user = await this.db.users.update({
      where: { id },
      data: { status_id: 2 }
    });
    res.status(200).send(user);
  };
}

export default UsersController;
