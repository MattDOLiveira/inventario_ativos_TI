const bdservice = require('../services/bdservice');

module.exports = {
    buscarTodos: async (req, res) => {
        let json = { error: '', result: [] };

        let funcionarios = await bdservice.buscarTodos();

        for (let i in funcionarios) {
            json.result.push({
                nome: funcionarios[i].Nome,
                CPF: funcionarios[i].CPF,
            });
        }
        res.json(json);
    },

    buscarUm: async (req, res) => {
        let json = { error: '', result: {} };

        let CPF = req.params.CPF;
        let funcionario = await bdservice.buscarUm(CPF);

        if (funcionario) {
            json.result = funcionario;
        }
        res.json(json);
    },

    inserirFuncionario: async (req, res) => {
        let json = { error: '', result: {} };

        let funcionario = req.body;
        let result = await bdservice.inserirFuncionario(funcionario);

        if (result.affectedRows) {
            json.result = { CPF: funcionario.CPF };
        }
        res.json(json);
    },

    excluirFuncionario: async (req, res) => {
        let json = { error: '', result: {} };

        let CPF = req.params.CPF;
        let result = await bdservice.excluirFuncionario(CPF);

        if (result.affectedRows) {
            json.result = { CPF };
        }
        res.json(json);
    },

    atualizarNome: async (req, res) => {
        let json = { error: '', result: {} };

        let CPF = req.params.CPF;
        let Nome = req.body.Nome;
        let result = await bdservice.atualizarNome(CPF, Nome);

        if (result.affectedRows) {
            json.result = { CPF, Nome };
        }
        res.json(json);
    },

    atualizarNotebook: async (req, res) => {
        let json = { error: '', result: {} };

        let CPF = req.params.CPF;
        let notebookInfo = req.body;
        let result = await bdservice.atualizarNotebook(CPF, notebookInfo);

        if (result.affectedRows) {
            json.result = { CPF, notebookInfo };
        }
        res.json(json);
    },

    limparNotebook: async (req, res) => {
        let json = { error: '', result: {} };

        let CPF = req.params.CPF;
        let result = await bdservice.limparNotebook(CPF);

        if (result.affectedRows) {
            json.result = { CPF };
        }
        res.json(json);
    },

    atualizarMonitor1: async (req, res) => {
        let json = { error: '', result: {} };

        let CPF = req.params.CPF;
        let monitor1Info = req.body;
        let result = await bdservice.atualizarMonitor1(CPF, monitor1Info);

        if (result.affectedRows) {
            json.result = { CPF, monitor1Info };
        }
        res.json(json);
    },

    limparMonitor1: async (req, res) => {
        let json = { error: '', result: {} };

        let CPF = req.params.CPF;
        let result = await bdservice.limparMonitor1(CPF);

        if (result.affectedRows) {
            json.result = { CPF };
        }
        res.json(json);
    },

    atualizarMonitor2: async (req, res) => {
        let json = { error: '', result: {} };

        let CPF = req.params.CPF;
        let monitor2Info = req.body;
        let result = await bdservice.atualizarMonitor2(CPF, monitor2Info);

        if (result.affectedRows) {
            json.result = { CPF, monitor2Info };
        }
        res.json(json);
    },

    limparMonitor2: async (req, res) => {
        let json = { error: '', result: {} };

        let CPF = req.params.CPF;
        let result = await bdservice.limparMonitor2(CPF);

        if (result.affectedRows) {
            json.result = { CPF };
        }
        res.json(json);
    },

    atualizarTeclado: async (req, res) => {
        let json = { error: '', result: {} };

        let CPF = req.params.CPF;
        let tecladoInfo = req.body;
        let result = await bdservice.atualizarTeclado(CPF, tecladoInfo);

        if (result.affectedRows) {
            json.result = { CPF, tecladoInfo };
        }
        res.json(json);
    },

    limparTeclado: async (req, res) => {
        let json = { error: '', result: {} };

        let CPF = req.params.CPF;
        let result = await bdservice.limparTeclado(CPF);

        if (result.affectedRows) {
            json.result = { CPF };
        }
        res.json(json);
    },

    atualizarMouse: async (req, res) => {
        let json = { error: '', result: {} };

        let CPF = req.params.CPF;
        let mouseInfo = req.body;
        let result = await bdservice.atualizarMouse(CPF, mouseInfo);

        if (result.affectedRows) {
            json.result = { CPF, mouseInfo };
        }
        res.json(json);
    },

    limparMouse: async (req, res) => {
        let json = { error: '', result: {} };

        let CPF = req.params.CPF;
        let result = await bdservice.limparMouse(CPF);

        if (result.affectedRows) {
            json.result = { CPF };
        }
        res.json(json);
    },

    atualizarNobreak: async (req, res) => {
        let json = { error: '', result: {} };

        let CPF = req.params.CPF;
        let nobreakInfo = req.body;
        let result = await bdservice.atualizarNobreak(CPF, nobreakInfo);

        if (result.affectedRows) {
            json.result = { CPF, nobreakInfo };
        }
        res.json(json);
    },

    limparNobreak: async (req, res) => {
        let json = { error: '', result: {} };

        let CPF = req.params.CPF;
        let result = await bdservice.limparNobreak(CPF);

        if (result.affectedRows) {
            json.result = { CPF };
        }
        res.json(json);
    },

    atualizarDesktop: async (req, res) => {
        let json = { error: '', result: {} };

        let CPF = req.params.CPF;
        let desktopInfo = req.body;
        let result = await bdservice.atualizarDesktop(CPF, desktopInfo);

        if (result.affectedRows) {
            json.result = { CPF, desktopInfo };
        }
        res.json(json);
    },

    limparDesktop: async (req, res) => {
        let json = { error: '', result: {} };

        let CPF = req.params.CPF;
        let result = await bdservice.limparDesktop(CPF);

        if (result.affectedRows) {
            json.result = { CPF };
        }
        res.json(json);
    },

    atualizarHeadset: async (req, res) => {
        let json = { error: '', result: {} };

        let CPF = req.params.CPF;
        let headsetInfo = req.body;
        let result = await bdservice.atualizarHeadset(CPF, headsetInfo);

        if (result.affectedRows) {
            json.result = { CPF, headsetInfo };
        }
        res.json(json);
    },

    limparHeadset: async (req, res) => {
        let json = { error: '', result: {} };

        let CPF = req.params.CPF;
        let result = await bdservice.limparHeadset(CPF);

        if (result.affectedRows) {
            json.result = { CPF };
        }
        res.json(json);
    },

    atualizarCelular: async (req, res) => {
        let json = { error: '', result: {} };

        let CPF = req.params.CPF;
        let celularInfo = req.body;
        let result = await bdservice.atualizarCelular(CPF, celularInfo);

        if (result.affectedRows) {
            json.result = { CPF, celularInfo };
        }
        res.json(json);
    },

    limparCelular: async (req, res) => {
        let json = { error: '', result: {} };

        let CPF = req.params.CPF;
        let result = await bdservice.limparCelular(CPF);

        if (result.affectedRows) {
            json.result = { CPF };
        }
        res.json(json);
    },

    atualizarAcessorios: async (req, res) => {
        let json = { error: '', result: {} };

        let CPF = req.params.CPF;
        let acessoriosInfo = req.body;
        let result = await bdservice.atualizarAcessorios(CPF, acessoriosInfo);

        if (result.affectedRows) {
            json.result = { CPF, acessoriosInfo };
        }
        res.json(json);
    },

    limparAcessorios: async (req, res) => {
        let json = { error: '', result: {} };

        let CPF = req.params.CPF;
        let result = await bdservice.limparAcessorios(CPF);

        if (result.affectedRows) {
            json.result = { CPF };
        }
        res.json(json);
    }
};
