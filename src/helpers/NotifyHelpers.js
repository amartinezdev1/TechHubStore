import { Notify } from 'quasar'

function notify({
    message,
    html,
    position,
    color,
    textColor,
    progress,
    timeout,
    multiLine,
    actions,
}) {
    Notify.create({
        message,
        html,
        position,
        color,
        textColor,
        progress,
        timeout,
        multiLine,
        actions,
    })
}

export function notifyWarn(msg, onAccept = null) {
    notify({
        message: msg,
        html: false,
        position: 'center',
        color: 'negative',
        textColor: 'white',
        progress: true,
        timeout: 5000,
        multiLine: true,
        actions: [
            {
                label: 'Aceptar',
                color: 'white',
                handler: () => {
                    if (typeof onAccept === 'function') onAccept()
                },
            },
        ],
    })
}
