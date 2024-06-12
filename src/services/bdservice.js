const db = require('../db');

module.exports = {
    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM inventario', (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    buscarUm: (CPF) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM inventario WHERE CPF = ?', [CPF], (error, results) => {
                if (error) { rejeitado(error); return; }
                if (results.length > 0) {
                    aceito(results[0]);
                } else {
                    aceito(false);
                }
            });
        });
    },

    inserirFuncionario: (funcionario) => {
        return new Promise((aceito, rejeitado) => {
            // Verificar restrições
            if (funcionario.Notebook === 'SIM' && funcionario.Notebook_Tag == null) {
                rejeitado('Notebook deve ter um Tag associado.');
                return;
            }
            const monitores = [funcionario.Monitor1, funcionario.Monitor2].filter(m => m === 'SIM').length;
            if (monitores > 2) {
                rejeitado('Funcionário não pode ter mais de 2 monitores.');
                return;
            }
            if (funcionario.Desktop === 'SIM' && funcionario.Desktop_Tag == null) {
                rejeitado('Desktop deve ter um Tag associado.');
                return;
            }
    
            // Inserir funcionário
            const query = `INSERT INTO inventario 
                (CPF, Nome, Notebook, Notebook_Tag, Notebook_Modelo, Notebook_NumeroSerie, Notebook_Versao, Notebook_Caracteristicas, Notebook_Observacao, 
                Monitor1, Monitor1_Modelo, Monitor1_NumeroSerie, Monitor1_Observacao, 
                Monitor2, Monitor2_Modelo, Monitor2_NumeroSerie, Monitor2_Observacao, 
                Teclado, Teclado_Modelo, Teclado_NumeroSerie, Teclado_Observacao, 
                Mouse, Mouse_Modelo, Mouse_NumeroSerie, Mouse_Observacao, 
                Desktop, Desktop_Tag, Desktop_Modelo, Desktop_NumeroSerie, Desktop_Versao, Desktop_Caracteristicas, Desktop_Observacao, 
                Acessorios, SuporteNotebook, MousePad, 
                Nobreak, Nobreak_Modelo, Nobreak_NumeroSerie, Nobreak_Observacao, 
                Headset, Headset_Modelo, Headset_NumeroSerie, Headset_Observacao, 
                Celular, Celular_Modelo, Celular_IMEI1, Celular_Numero, Celular_Observacao)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            const values = [
                funcionario.CPF, funcionario.Nome, funcionario.Notebook, funcionario.Notebook_Tag, funcionario.Notebook_Modelo, funcionario.Notebook_NumeroSerie, funcionario.Notebook_Versao, funcionario.Notebook_Caracteristicas, funcionario.Notebook_Observacao, 
                funcionario.Monitor1, funcionario.Monitor1_Modelo, funcionario.Monitor1_NumeroSerie, funcionario.Monitor1_Observacao, 
                funcionario.Monitor2, funcionario.Monitor2_Modelo, funcionario.Monitor2_NumeroSerie, funcionario.Monitor2_Observacao, 
                funcionario.Teclado, funcionario.Teclado_Modelo, funcionario.Teclado_NumeroSerie, funcionario.Teclado_Observacao, 
                funcionario.Mouse, funcionario.Mouse_Modelo, funcionario.Mouse_NumeroSerie, funcionario.Mouse_Observacao, 
                funcionario.Desktop, funcionario.Desktop_Tag, funcionario.Desktop_Modelo, funcionario.Desktop_NumeroSerie, funcionario.Desktop_Versao, funcionario.Desktop_Caracteristicas, funcionario.Desktop_Observacao, 
                funcionario.Acessorios, funcionario.SuporteNotebook, funcionario.MousePad, 
                funcionario.Nobreak, funcionario.Nobreak_Modelo, funcionario.Nobreak_NumeroSerie, funcionario.Nobreak_Observacao, 
                funcionario.Headset, funcionario.Headset_Modelo, funcionario.Headset_NumeroSerie, funcionario.Headset_Observacao, 
                funcionario.Celular, funcionario.Celular_Modelo, funcionario.Celular_IMEI1, funcionario.Celular_Numero, funcionario.Celular_Observacao
            ];
            db.query(query, values, (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    

    excluirFuncionario: (CPF) => {
        return new Promise((aceito, rejeitado) => {
            const checkQuery = `
                SELECT COUNT(*) AS ativos
                FROM inventario
                WHERE CPF = ? AND (
                    Notebook = 'SIM' OR Monitor1 = 'SIM' OR Monitor2 = 'SIM' OR 
                    Teclado = 'SIM' OR Mouse = 'SIM' OR Desktop = 'SIM' OR 
                    Nobreak = 'SIM' OR Headset = 'SIM' OR Celular = 'SIM'
                )
            `;
            db.query(checkQuery, [CPF], (error, results) => {
                if (error) { rejeitado(error); return; }
    
                if (results[0].ativos > 0) {
                    rejeitado('Funcionário possui ativos configurados.');
                } else {
                    const deleteQuery = 'DELETE FROM inventario WHERE CPF = ?';
                    db.query(deleteQuery, [CPF], (error, results) => {
                        if (error) { rejeitado(error); return; }
                        aceito(results);
                    });
                }
            });
        });
    },
    

    atualizarNome: (CPF, Nome) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE inventario SET Nome = ? WHERE CPF = ?', [Nome, CPF], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    atualizarNotebook: (CPF, notebookInfo) => {
        return new Promise((aceito, rejeitado) => {
            const query = 'UPDATE inventario SET Notebook_Modelo = ?, Notebook_NumeroSerie = ?, Notebook_Versao = ?, Notebook_Caracteristicas = ?, Notebook_Observacao = ? WHERE CPF = ?';
            const values = [notebookInfo.Modelo, notebookInfo.NumeroSerie, notebookInfo.Versao, notebookInfo.Caracteristicas, notebookInfo.Observacao, CPF];
            db.query(query, values, (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    limparNotebook: (CPF) => {
        return new Promise((aceito, rejeitado) => {
            const query = 'UPDATE inventario SET Notebook_Modelo = NULL, Notebook_NumeroSerie = NULL, Notebook_Versao = NULL, Notebook_Caracteristicas = NULL, Notebook_Observacao = NULL WHERE CPF = ?';
            db.query(query, [CPF], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    atualizarMonitor1: (CPF, monitor1Info) => {
        return new Promise((aceito, rejeitado) => {
            const query = 'UPDATE inventario SET Monitor1_Modelo = ?, Monitor1_NumeroSerie = ?, Monitor1_Observacao = ? WHERE CPF = ?';
            const values = [monitor1Info.Modelo, monitor1Info.NumeroSerie, monitor1Info.Observacao, CPF];
            db.query(query, values, (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    limparMonitor1: (CPF) => {
        return new Promise((aceito, rejeitado) => {
            const query = 'UPDATE inventario SET Monitor1_Modelo = NULL, Monitor1_NumeroSerie = NULL, Monitor1_Observacao = NULL WHERE CPF = ?';
            db.query(query, [CPF], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    atualizarMonitor2: (CPF, monitor2Info) => {
        return new Promise((aceito, rejeitado) => {
            const query = 'UPDATE inventario SET Monitor2_Modelo = ?, Monitor2_NumeroSerie = ?, Monitor2_Observacao = ? WHERE CPF = ?';
            const values = [monitor2Info.Modelo, monitor2Info.NumeroSerie, monitor2Info.Observacao, CPF];
            db.query(query, values, (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    limparMonitor2: (CPF) => {
        return new Promise((aceito, rejeitado) => {
            const query = 'UPDATE inventario SET Monitor2_Modelo = NULL, Monitor2_NumeroSerie = NULL, Monitor2_Observacao = NULL WHERE CPF = ?';
            db.query(query, [CPF], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    atualizarTeclado: (CPF, tecladoInfo) => {
        return new Promise((aceito, rejeitado) => {
            const query = 'UPDATE inventario SET Teclado_Modelo = ?, Teclado_NumeroSerie = ?, Teclado_Observacao = ? WHERE CPF = ?';
            const values = [tecladoInfo.Modelo, tecladoInfo.NumeroSerie, tecladoInfo.Observacao, CPF];
            db.query(query, values, (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    limparTeclado: (CPF) => {
        return new Promise((aceito, rejeitado) => {
            const query = 'UPDATE inventario SET Teclado_Modelo = NULL, Teclado_NumeroSerie = NULL, Teclado_Observacao = NULL WHERE CPF = ?';
            db.query(query, [CPF], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    atualizarMouse: (CPF, mouseInfo) => {
        return new Promise((aceito, rejeitado) => {
            const query = 'UPDATE inventario SET Mouse_Modelo = ?, Mouse_NumeroSerie = ?, Mouse_Observacao = ? WHERE CPF = ?';
            const values = [mouseInfo.Modelo, mouseInfo.NumeroSerie, mouseInfo.Observacao, CPF];
            db.query(query, values, (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    limparMouse: (CPF) => {
        return new Promise((aceito, rejeitado) => {
            const query = 'UPDATE inventario SET Mouse_Modelo = NULL, Mouse_NumeroSerie = NULL, Mouse_Observacao = NULL WHERE CPF = ?';
            db.query(query, [CPF], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    atualizarNobreak: (CPF, nobreakInfo) => {
        return new Promise((aceito, rejeitado) => {
            const query = 'UPDATE inventario SET Nobreak_Modelo = ?, Nobreak_NumeroSerie = ?, Nobreak_Observacao = ? WHERE CPF = ?';
            const values = [nobreakInfo.Modelo, nobreakInfo.NumeroSerie, nobreakInfo.Observacao, CPF];
            db.query(query, values, (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    limparNobreak: (CPF) => {
        return new Promise((aceito, rejeitado) => {
            const query = 'UPDATE inventario SET Nobreak_Modelo = NULL, Nobreak_NumeroSerie = NULL, Nobreak_Observacao = NULL WHERE CPF = ?';
            db.query(query, [CPF], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    atualizarDesktop: (CPF, desktopInfo) => {
        return new Promise((aceito, rejeitado) => {
            const query = 'UPDATE inventario SET Desktop_Modelo = ?, Desktop_NumeroSerie = ?, Desktop_Versao = ?, Desktop_Caracteristicas = ?, Desktop_Observacao = ? WHERE CPF = ?';
            const values = [desktopInfo.Modelo, desktopInfo.NumeroSerie, desktopInfo.Versao, desktopInfo.Caracteristicas, desktopInfo.Observacao, CPF];
            db.query(query, values, (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    limparDesktop: (CPF) => {
        return new Promise((aceito, rejeitado) => {
            const query = 'UPDATE inventario SET Desktop_Modelo = NULL, Desktop_NumeroSerie = NULL, Desktop_Versao = NULL, Desktop_Caracteristicas = NULL, Desktop_Observacao = NULL WHERE CPF = ?';
            db.query(query, [CPF], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    atualizarHeadset: (CPF, headsetInfo) => {
        return new Promise((aceito, rejeitado) => {
            const query = 'UPDATE inventario SET Headset_Modelo = ?, Headset_NumeroSerie = ?, Headset_Observacao = ? WHERE CPF = ?';
            const values = [headsetInfo.Modelo, headsetInfo.NumeroSerie, headsetInfo.Observacao, CPF];
            db.query(query, values, (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    limparHeadset: (CPF) => {
        return new Promise((aceito, rejeitado) => {
            const query = 'UPDATE inventario SET Headset_Modelo = NULL, Headset_NumeroSerie = NULL, Headset_Observacao = NULL WHERE CPF = ?';
            db.query(query, [CPF], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    atualizarCelular: (CPF, celularInfo) => {
        return new Promise((aceito, rejeitado) => {
            const query = 'UPDATE inventario SET Celular_Modelo = ?, Celular_IMEI1 = ?, Celular_Numero = ?, Celular_Observacao = ? WHERE CPF = ?';
            const values = [celularInfo.Modelo, celularInfo.IMEI1, celularInfo.Numero, celularInfo.Observacao, CPF];
            db.query(query, values, (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    limparCelular: (CPF) => {
        return new Promise((aceito, rejeitado) => {
            const query = 'UPDATE inventario SET Celular_Modelo = NULL, Celular_IMEI1 = NULL, Celular_Numero = NULL, Celular_Observacao = NULL WHERE CPF = ?';
            db.query(query, [CPF], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    atualizarAcessorios: (CPF, acessoriosInfo) => {
        return new Promise((aceito, rejeitado) => {
            const query = 'UPDATE inventario SET Acessorios = ?, SuporteNotebook = ?, MousePad = ? WHERE CPF = ?';
            const values = [acessoriosInfo.Acessorios, acessoriosInfo.SuporteNotebook, acessoriosInfo.MousePad, CPF];
            db.query(query, values, (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    limparAcessorios: (CPF) => {
        return new Promise((aceito, rejeitado) => {
            const query = 'UPDATE inventario SET Acessorios = NULL, SuporteNotebook = NULL, MousePad = NULL WHERE CPF = ?';
            db.query(query, [CPF], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    }
};
