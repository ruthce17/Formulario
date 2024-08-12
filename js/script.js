//console.log("Projeto");

document.getElementById("enviar").setAttribute("disabled", true);
document.getElementById("enviar").removeAttribute("disabled");
document.getElementById("cpf")
.addEventListener("input", function (e) {
    const input = e.target.value;
    const cpfIsvalid = /^[0-9]*$/.test(input);
    if (!cpfIsvalid) {
        e.target.value = input.slice(0,-1);
        document.getElementById("cpf-erro-message").style.display = "block";
    } else {
        document.getElementById("cpf-erro-message").style.display = "none";
    }
});

document.getElementById("cpf").addEventListener("change", function (e) {
    e.target.value = mascararCPF(e.target.value);
    /*validarCPF(e.target.value) === true 
    ? document.getElementById("enviar").removeAttribute("disabled") 
    : document.getElementById("enviar").setAttribute("disabled", true)*/
    ativaDesativaEnviar(validarCPF(e.target.value));
    });


    document.getElementById("prova1").addEventListener("change", function (e) {
        ativaDesativaEnviar(validarNumero(e.target.value));
    });

    document.getElementById("prova2").addEventListener("change", function (e) {
        ativaDesativaEnviar(validarNumero(e.target.value));
    });

    document.getElementById("nome").addEventListener("change", function (e) {
        ativaDesativaEnviar(validarVazio(e.target.value));
    });

    document.getElementById("email").addEventListener("input", function (e) {
        const email = e.target.value;
        const emailIsValid = validarEmail(email);
        const emailField = document.getElementById("email");
    
        if (email.trim() === "") {

            document.getElementById("email-erro-message").textContent = "O campo de email não pode estar vazio.";
            document.getElementById("email-erro-message").style.display = "block";
        } else if (!emailIsValid) {

            document.getElementById("email-erro-message").textContent = "Por favor, insira um email válido.";
            document.getElementById("email-erro-message").style.display = "block";
        } else {

            document.getElementById("email-erro-message").style.display = "none";
        }

        ativaDesativaEnviar(emailIsValid);
    });
    
    document.getElementById("ddi").addEventListener("change", function (e) {
        ativaDesativaEnviar(validarVazio(e.target.value));
        });

    document.getElementById("telefone").addEventListener("change", function (e) {
        ativaDesativaEnviar(validarVazio(e.target.value));
        e.target.value = mascaraTelefone(e.target.value);
        ativaDesativaEnviar(validarVazio(e.target.value));
        });

    document.getElementById("cidade").addEventListener("change", function (e) {
        ativaDesativaEnviar(validarVazio(e.target.value));
    });


const students = [];

class Studant {
    constructor(nome,cpf,nascimento,email,ddi,telefone,pais,estado,cidade,prova1,prova2){
        this.nome = nome;
        this.cpf = cpf;
        this.nascimento = nascimento;
        this.email = email;
        this.ddi = ddi;
        this.telefone = telefone;
        this.pais = pais;
        this.estado = estado;
        this.cidade = cidade;
        this.prova1 = prova1;
        this.prova2 = prova2;
        this.media = ((prova1 + prova2) / 2);
        this.situacao = this.media >= 5 ? "aprovado" : "reprovado";
    }

    exibeDados() {
        return `O Aluno ${this.nome} tirou nota ${this.prova1} na P1 e ${this.prova2} na P2. Sua média é: ${this.media.toString().replace(".", ",")} e esta ${this.situacao } `;
    }
}

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, "");

    if (cpf.length !== 11) return false;

    if (/^(\d)\1+$/.test(cpf)) return false;

    for (let t = 9; t < 11; t++) {
        let d = 0;
    for (let i = 0; i < t; i++) {
        d += cpf[i] * (t + 1 - i);
    }
      d = ((10 * d) % 11) % 10;
    if (cpf[t] != d) return false;
    }

    return true;
}

function validarNumero(numero) {

    if (numero >= 0 && numero <= 10) {
        return true;
    } else {
        return false;
    }
}

function validarVazio(campo) {
    if (campo.trim() !== "") {
        return true;
    } else {
        return false;
    }
}

function validarTelefone(telefone, ddi) {
    telefone = telefone.replace(/[^\d]+/g, "");

    if (ddi === '+55') {

        if (telefone.length === 11 ) {
            const ddd = telefone.substring(0, 2);
            const numero = telefone.substring(2);

            if (/^\d{2}$/.test(ddd) && (/^\d{8}$/.test(numero) || /^\d{9}$/.test(numero))) {
                return true;
            }
        }
    } else if (ddi === '+58') {

        if (telefone.length === 11) {
            const ddd = telefone.substring(2, 4);
            const numero = telefone.substring(4);

            if (/^\d{2}$/.test(ddd) && /^\d{7}$/.test(numero)) {
                return true;
            }
        }
    }

    return false;
}

function validarEmail(email) {
    // Expresión regular para validar el formato del email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function ativaDesativaEnviar(valor){
    valor === true
    ? document.getElementById("enviar").removeAttribute("disabled") 
    : document.getElementById("enviar").setAttribute("disabled", true);
}

function mascararCPF(input) {
    input = input.replace(/(\d{3})(\d)/, "$1.$2");
    input = input.replace(/(\d{3})(\d)/, "$1.$2");
    input = input.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return input;
}

function mascaraTelefone(telefone, ddi) {
    telefone = telefone.replace(/[^\d]+/g, ""); 

    if (ddi === '+55') {

        if (telefone.length === 11) {
            return telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
        }
    } else if (ddi === '+58') {

        if (telefone.length === 11) {
            return telefone.replace(/(\d{4})(\d{7})/, "($1) $2");
        }
    }

    return telefone;
}

function aplicarMascara() {
    const input = document.getElementById('telefone');
    const ddi = document.getElementById('ddi').value;
    input.value = mascaraTelefone(input.value, ddi);
}


    function enviarFormulario() {
    const nome = document.getElementById("nome").value;
    const cpf = document.getElementById("cpf").value;
    const nascimento = document.getElementById("nascimento").value;
    const email = document.getElementById("email").value;
    const ddi = document.getElementById("ddi").value;
    const telefone = document.getElementById("telefone").value;
    const pais = document.getElementById("pais").value;
    const estado = document.getElementById("estado").value;
    const cidade = document.getElementById("cidade").value;
    const prova1 = parseFloat(document.getElementById("prova1").value);
    const prova2 = parseFloat(document.getElementById("prova2").value);
    
    const student = new Studant(
        nome,
        cpf,
        nascimento,
        email,
        ddi,
        telefone,
        pais,
        estado,
        cidade,
        prova1,
        prova2
    );

    students.push(student);

    rederData();

    function rederData() {
        const studentTableBody = document.getElementById("studentTableBody");
        studentTableBody.innerHTML = "";

        students.forEach((student) => {
            const row = document.createElement("tr");
            Object.values(student).forEach((value) => {const cell = document.createElement("td");
            cell.textContent = value;
            studentTableBody.appendChild(cell);
            });
        studentTableBody.appendChild(row);      
        });
    }
}

function exportaCSV() {
    const header = [
        "nome",
        "cpf",
        "nascimento", 
        "email",
        "ddi",        
        "telefone",
        "pais",
        "estado",
        "cidade",
        "prova1",
        "prova2",
        "media",
        "situacao",
    ];
    const rows = students.map((studant) =>
        Object.values(studant)
            .map((value) => `"${value}"`)
            .join(";")
        );
        const csvContent = [header.join(";"), ...rows].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;chaset=utf-8" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);

        link.setAttribute("href", url);
        link.setAttribute("download", "lista_estudantes.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        

    }


    function exportaPDF() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        const header = [
            "Nome",
            "CPF",
            "Nascimento",
            "Email",
            "ddi",
            "Telefone",
            "País",
            "Estado",
            "Cidade",
            "Prova 1",
            "Prova 2",
            "Média",
            "Situacao",
        ];

        const rows = students.map((student) => Object.values(student));

        doc.text("Lista de Estudantes", 14, 16);


        doc.autoTable({
            head: [header],
            body: rows,
            startY: 20,
            styles: { fontSize: 8 },
        });

        // Salva o PDF
        doc.save("lista_estudantes.pdf");
    }

