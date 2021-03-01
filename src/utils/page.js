import { resolve } from 'path'
import _escape from 'lodash/escape'

export const embedNotFound = res => (url) => res.status(404).send(
    `<style>
        .link {color:#5488c7;font-size:1rem;text-decoration:none}.link:hover{color:#33629c;text-decoration:underline}
    </style>
    <div>
        <h4>404 - Sorry, the embed could not be found!</h4>
        <p>Embed URL: <a class="link" href="${_escape(url)}" target="_blank">${_escape(url)}</a></p>
    </div>`
)

export const responseEmbed = res => (iframe, { title } = {}) => {
    const template = resolve(__dirname, '../views/embed.pug')
    return res.render(template, { title, iframe }, (err, html) => {
        if (err) throw err
        return res.send(html)
    })
}

export const profileEmbed = res => (profile, { title } = {}) => {
    const template = resolve(__dirname, '../views/profile-embed.pug')
    return res.render(template, { title, profile }, (err, html) => {
        if (err) throw err
        return res.send(html)
    })
}
