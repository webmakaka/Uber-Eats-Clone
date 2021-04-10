import {Inject, Injectable} from '@nestjs/common';
import {CONFIG_OPTIONS} from 'common/common.constants';
import * as FormData from 'form-data';
import got from 'got';
import {IEmailVar, IMailModuleOptions} from 'mail/mail.interfaces';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: IMailModuleOptions,
  ) {}

  async sendEmail(subject: string, template: string, emailVars: IEmailVar[]) {
    const form = new FormData();
    form.append('from', `Marley <mailgun@${this.options.domain}>`);
    form.append('to', 'a3333333@gmail.com');
    form.append('subject', subject);
    form.append('template', template);

    emailVars.forEach((eVar) => form.append(`v:${eVar.key}`, eVar.value));

    try {
      const response = await got(
        `https://api.mailgun.net/v3/${this.options.domain}/messages`,
        {
          method: 'POST',
          headers: {
            Authorization: `Basic ${Buffer.from(
              `api:${this.options.apiKey}`,
            ).toString('base64')}`,
          },
          body: form,
        },
      );
    } catch (error) {
      console.log(error);
    }
  }

  sendVerificationEmail(email: string, code: string) {
    this.sendEmail('Verify Your Email', 'verify-email', [
      { key: 'code', value: code },
      { key: 'username', value: email },
    ]);
  }
}
