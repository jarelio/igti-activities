import { db } from '../models/index.js';
import { logger } from '../config/logger.js';

const { gradeModel } = db.models;

const create = async (req, res) => {
    try {
        const { name, subject, value } = req.body;

        if (!name || !subject || !value) {
            res.status(400).send({
                error: 'É necessário passar os parâmetros',
            });
        }
        const grade = new gradeModel({ name, subject, value });
        await grade.save();
        res.send({ message: 'Grade inserido com sucesso' });
        logger.info(`POST /grade - ${JSON.stringify(req.body)}`);
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Algum erro ocorreu ao salvar',
        });
        logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
    }
};

const findAll = async (req, res) => {
    const name = req.query.name;

    //condicao para o filtro no findAll
    var condition = name
        ? { name: { $regex: new RegExp(name), $options: 'i' } }
        : {};

    try {
        const grade = await gradeModel.find(condition);
        res.send(grade);
        logger.info(`GET /grade`);
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Erro ao listar todos os documentos',
        });
        logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
    }
};

const findOne = async (req, res) => {
    const id = req.params.id;

    try {
        const grade = await gradeModel.findById(id);
        res.send(grade);
        logger.info(`GET /grade - ${id}`);
    } catch (error) {
        res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
        logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
    }
};

const update = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'Dados para atualizacao vazio',
        });
    }

    const id = req.params.id;

    try {
        const grade = await gradeModel.findByIdAndUpdate(id, req.body);
        res.send(grade);
        logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
    } catch (error) {
        res.status(500).send({
            message: 'Erro ao atualizar a Grade id: ' + id,
        });
        logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
    }
};

const remove = async (req, res) => {
    const id = req.params.id;

    try {
        const grade = await gradeModel.findByIdAndDelete(id);
        res.send(grade);
        logger.info(`DELETE /grade - ${id}`);
    } catch (error) {
        res.status(500).send({
            message: 'Nao foi possivel deletar o Grade id: ' + id,
        });
        logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
    }
};

const removeAll = async (req, res) => {
    try {
        const grades = await gradeModel.deleteMany({});
        res.send(grades);
        logger.info(`DELETE /grade`);
    } catch (error) {
        res.status(500).send({ message: 'Erro ao excluir todos as Grades' });
        logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
    }
};

export default { create, findAll, findOne, update, remove, removeAll };
