import { Login, Question } from '@/configs/index';
import { BaseService } from '.';

import { appEncryptAESByObj } from '@/utils/index';
import { GetAnswerStatParams } from './types';

/**
 * 题库相关
 */
export class QuestionService extends BaseService {
    constructor() {
        super();
    }

    /**
     * 答题数据统计
     * @param params 请求参数
     */
    getAnswerStat(params: GetAnswerStatParams) {
        return this.get<null>(Question.getAnswerStat, params);
    }

    /**
    * CTC考试日期
    * @param params 请求参数
    */
    getTestDate() {
        return this.get<null>(Question.getTestDate);
    }

    /**
     * 错题本收藏夹题目
     * @param params 请求参数
     */
    getErrorCollect(params) {
        return this.post<any>(Question.getErrorCollect, params)
    }

    /**
     * 错题本题目 && 答案解析 && 答题记录
     * @param params 请求参数
     */
    getErrorCollectInfo(params) {
        return this.post<any>(Question.getErrorCollectInfo, params)
    }
    /**
     * 答题页数据
     * @param params 请求参数
     */
    getErrorCollectAnswerList(params) {
        return this.post<any>(Question.getErrorCollectAnswerList, params)
    }
    /**
     * 错题本收藏夹提交答案
     * @param params 请求参数
     */
    answerComplete(params) {
        return this.post<any>(Question.answerComplete, params)
    }
    /**
     * 题库分类列表
     * @param params 请求参数
     */
    getDirectoryList(params) {
        return this.get<any>(Question.getDirectoryList, params)
    }
    /**
     * 错题本收藏夹 取消收藏 移除题目
     * @param params 请求参数
     */
    questionCancel(params) {
        return this.post<any>(Question.questionCancel, params)
    }
    /**
     * 错题本收藏夹 收藏
     * @param params 请求参数
     */
    questionSave(params) {
        return this.post<any>(Question.questionSave, params)
    }
    /**
     * 查询题目的收藏状态
     * @param params 请求参数
     */
    getQuestionStatus(params) {
        return this.post<any>(Question.getQuestionStatus, params)
    }

    /**
     * 专题练习 真题模拟目录
     * @param params 请求参数
     */
    getAppletDirectory(params) {
        return this.post<any>(Question.getAppletDirectory, params)
    }


     /**
     * 专题练习 真题模拟目录
     * @param params 请求参数
     */
    deleteAnswerRecord(params) {
        return this.post<any>(Question.deleteAnswerRecord, params)
    }

     /**
     * 专题练习 真题模拟答题页题目
     * @param params 请求参数
     */
    getExamQuestion(params) {
        return this.post<any>(Question.getExamQuestion, params)
    }

     /**
     * 专题练习 真题模拟答案提交
     * @param params 请求参数
     */
    examQuestionComplete(params) {
        return this.post<any>(Question.examQuestionComplete, params)
    }

}
