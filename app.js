// Seleciona elementos do modal
const modal = document.getElementById("myModal");

//Seleciona elementos da main
const form = document.getElementById('pomodoroForm');
const tempoPomodoro = document.getElementById('focusTime');
const descansoCurto = document.getElementById('shortBreak');
const descansoLongo = document.getElementById('longBreak');

let tempo;
let cronometro = (tempoPomodoro.value * 60); //25 minutos
let ativo = false;
let modo = true;
let cont = 0;

exibirCronometro();

// Fecha o modal ao clicar fora dele
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// Abre o modal
function abrirModalBtn() {
    modal.style.display = "flex";
};

// Fecha o modal
function fecharModalBtn() {
    modal.style.display = "none";
};



form.addEventListener('submit', e => {
    e.preventDefault();
})

tempoPomodoro.addEventListener("blur", () => {
    checkInputs(tempoPomodoro);
})

descansoCurto.addEventListener("blur", () => {
    checkInputs(descansoCurto);
})

descansoLongo.addEventListener("blur", () => {
    checkInputs(descansoLongo);
})

function exibirCronometro() {
    const minutos = Math.floor(cronometro / 60);
    const segundos = cronometro % 60;
    document.getElementById("cronometro").textContent = `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
}

function iniciarCronometro() {
    if (!ativo) {
        ativo = true;
        tempo = setInterval(() => {
            if (cronometro > 0) {
                cronometro--;
                exibirCronometro();
            }
            else {
                clearInterval(tempo);
                document.getElementById('alarmSound').play();
                ativo = false;
                modoCronometro();
            }
        }, 1000)
    }
}

function modoCronometro() {
    if (modo) {
        mensagemAlerta("Hora do descansar!", 15000, "#00b4cc");
        descanso();
        cont++;
    } else {
        mensagemAlerta("Hora de voltar ao foco!", 15000, "#808080");
        cronometro = tempoPomodoro.value * 60;
    }
    modo = !modo;
    exibirCronometro();
    iniciarCronometro();
}

function descanso() {
    let tempoDescanso;
    if (cont >= 3) {
        tempoDescanso = descansoLongo.value;
        cont = 0;
    } else {
        tempoDescanso = descansoCurto.value;
    }
    cronometro = tempoDescanso * 60;
}

function pausarCronometro() {
    clearInterval(tempo);
    ativo = false;
}

function reiniciarCronometro() {
    clearInterval(tempo);
    cronometro = tempoPomodoro.value * 60;
    exibirCronometro();
    ativo = false;
    modo = true;
}

function checkInputs(input) {
    const formItem = input.parentElement;

    if (input.value === "") {
        formItem.className = "textfield error";
        mensagemAlerta("Campo obrigatório!", 3000, "#ef2d29");
    }
    else {
        formItem.className = "textfield";
    }
}

function checkForm() {
    checkInputs(tempoPomodoro);
    checkInputs(descansoCurto);
    checkInputs(descansoLongo);

    const formItens = form.querySelectorAll(".textfield");
    const isValid = [...formItens].every((item) => {
        return item.className === "textfield";
    });

    if (isValid) {
        salvarTempos();
    }
}

function salvarTempos() {
    cronometro = tempoPomodoro.value * 60;
    mensagemAlerta("Tempos atualizados!", 3000, "#38b94e");
    exibirCronometro();
    fecharModalBtn();
}

function mensagemAlerta(mensagem, duracao, color) {
    Toastify({
        text: `${mensagem}`,
        duration: `${duracao}`,
        close: true,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        style: {
            background: `${color}`,
        },
    }).showToast();
    return;
}