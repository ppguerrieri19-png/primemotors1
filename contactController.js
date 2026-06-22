exports.submitContact = (req, res) => {
  const { nome, telefone, mensagem } = req.body;

  res.json({
    success: true,
    message: 'Mensagem recebida com sucesso!',
    data: {
      nome,
      telefone,
      mensagem
    }
  });
};