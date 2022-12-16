import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { format } from 'date-fns';
import md5 from 'md5';
import { encode } from 'js-base64';
import request from 'service/fetch';
import { ISession } from 'pages/api/index';
import { ironOptions } from 'config/index';

export default withIronSessionApiRoute(sendVerifyCode, ironOptions);

async function sendVerifyCode(req: NextApiRequest, res: NextApiResponse) {
  const session: ISession = req.session;
  const { to = '', templateId = '1' } = req.body;
  const AppId = '8aaf0708842397dd0184b8755a823502';
  const AccountId = '8aaf0708842397dd0184b875599834fb';
  const AuthToken = 'f40d5d54fc66499ab5f49dac9b3fd386';
  const NowDate = format(new Date(), 'yyyyMMddHHmmss');
  const SigParameter = md5(`${AccountId}${AuthToken}${NowDate}`);
  const Authorization = encode(`${AccountId}:${NowDate}`);
  // const verifyCode = Math.floor(Math.random() * (9999 - 1000)) + 1000;
  const verifyCode = 1234;
  const expireMinute = '5';
  const url = `https://app.cloopen.com:8883/2013-12-26/Accounts/${AccountId}/SMS/TemplateSMS?sig=${SigParameter}`;

  // const response = await request.post(
  //   url,
  //   {
  //     to,
  //     templateId,
  //     appId: AppId,
  //     datas: [verifyCode, expireMinute],
  //   },
  //   {
  //     headers: {
  //       Authorization,
  //     },
  //   }
  // );

  console.log(verifyCode);
  // console.log(response);
  // const { statusCode, templateSMS, statusMsg } = response as any;
  const { statusCode, templateSMS, statusMsg } = {
    statusCode: '000000',
    statusMsg: '成功',
    templateSMS: '1212',
  };
  if (statusCode === '000000') {
    session.verifyCode = verifyCode;
    await session.save();
    res.status(200).json({
      code: 0,
      msg: statusMsg,
      data: {
        templateSMS,
      },
    });
  } else {
    res.status(200).json({
      code: statusCode,
      msg: statusMsg,
    });
  }
}
