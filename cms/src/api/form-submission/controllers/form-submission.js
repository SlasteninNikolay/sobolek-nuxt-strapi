'use strict';

const { factories } = require('@strapi/strapi');

module.exports = factories.createCoreController(
    'api::form-submission.form-submission',
    ({ strapi }) => ({
        async create(ctx) {
            try {
                const sanitizedInput = await this.sanitizeInput(ctx.request.body, ctx);
                const { data } = sanitizedInput;
                const { name, phone, formType, source, agreeTerms } = data;

                // Создаем запись
                const entry = await strapi.entityService.create('api::form-submission.form-submission', {
                    data: {
                        name,
                        phone,
                        formType: formType || 'contact',
                        source: source || 'website',
                        agreeTerms: agreeTerms === "true" || agreeTerms === true,
                        submittedAt: new Date()
                    },
                });

                const adminEmails = process.env.SMTP_TO_ADMIN
                    ? process.env.SMTP_TO_ADMIN.split(',').map(email => email.trim())
                    : ['slastenindev@gmail.com']; // fallback

                // Отправляем email с noreply ящика
                if (process.env.SEND_EMAILS !== 'false') {
                    try {
                        const hasEmailPlugin = Boolean(strapi.plugins?.email?.services?.email?.send);
                        if (!hasEmailPlugin) {
                            strapi.log.error('[form-submission] Email plugin is not available. Check @strapi/provider-email-nodemailer installation and cms/config/plugins.js');
                        }

                        const smtpFrom = process.env.SMTP_DEFAULT_FROM;
                        const smtpReplyTo = process.env.SMTP_DEFAULT_REPLY_TO;

                        if (!process.env.SMTP_HOST || !process.env.SMTP_USERNAME || !process.env.SMTP_PASSWORD) {
                            strapi.log.error('[form-submission] SMTP env is missing (SMTP_HOST/SMTP_USERNAME/SMTP_PASSWORD). Email will not be sent.');
                        }

                        if (!smtpFrom) {
                            strapi.log.warn('[form-submission] SMTP_DEFAULT_FROM is not set. Provider may reject sending.');
                        }

                        await strapi.plugins['email'].services.email.send({
                            to: adminEmails,
                            from: smtpFrom,
                            replyTo: smtpReplyTo,
                            subject: `📋 Новая заявка: ${formType || 'контактная форма'}`,
                            html: `
                                <div style="font-family: Montserrat, sans-serif; max-width: 600px;">
                                  <h2 style="color: #244C60;">🔔 Новая заявка</h2>
                                  
                                  <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #244C60;">
                                    <p><strong>👤 Имя:</strong> ${name}</p>
                                    <p><strong>📞 Телефон:</strong> <a href="tel:${phone}">${phone}</a></p>
                                    <p><strong>📝 Тип формы:</strong> ${formType || 'контактная'}</p>
                                    <p><strong>🌐 Источник:</strong> ${source || 'сайт'}</p>
                                    <p><strong>✅ Согласие с политикой:</strong> ${agreeTerms ? 'Да' : 'Нет'}</p>
                                    <p><strong>📅 Дата получения:</strong> ${new Date().toLocaleString('ru-RU')}</p>
                                  </div>
                                  
                                  <div style="margin-top: 20px; padding: 15px; background: #fff3cd; border-radius: 6px;">
                                    <p style="margin: 0; color: #856404;">
                                      <strong>⚠️ Внимание:</strong> Это автоматическое уведомление. 
                                      Пожалуйста, не отвечайте на это письмо. 
                                      Для связи используйте почту: ${process.env.SMTP_DEFAULT_REPLY_TO}
                                    </p>
                                  </div>
                                  
                                  <p style="color: #6c757d; font-size: 12px; margin-top: 20px;">
                                    © ${new Date().getFullYear()} Отель Славянка Саяногорск. Все права защищены.
                                  </p>
                                </div>
                              `,
                        });

                        strapi.log.info(`[form-submission] Email sent to: ${adminEmails.join(', ')}`);

                    } catch (emailError) {
                        strapi.log.error('❌ Ошибка отправки email:', emailError);
                    }
                } else {
                    strapi.log.info('Email sending is disabled by SEND_EMAILS=false');
                }

                // Возвращаем ответ
                const sanitizedEntry = await this.sanitizeOutput(entry, ctx);
                return this.transformResponse(sanitizedEntry);

            } catch (error) {
                strapi.log.error('Error:', error);
                ctx.throw(500, 'Internal server error');
            }
        }
    })
);
