// customização do lightbox
lightbox.option({
    'albumLabel': 'Foto %1 de %2',
    'fadeDuration': 1000
});

// Inicialização do plugin AOS animation
AOS.init();


// Comportamento da seta sobe
// Quando ocorre rolagem na tela do navegador
$(window).scroll(function(){
    //SE A ROLAGEM FOR MAIOR OU IGUAL A 600
    //MOSTRA A SETA COM FADE
    //CASO CONTRÁRIO, OCULTA A SETA COM FADE

    if($(window).scrollTop() >=550)
    {
        $('.seta-sobe').fadeIn();
    }else{
        $('.seta-sobe').fadeOut();
    }
});

$('.seta-sobe').click(function(){
    //aplica animação de rolagem no body,html até o topo
    $('body, html').animate({
       //fontSize: 30,
       //margin: 100
       scrollTop: 0
    },1200);
});


//Rolagem com animação nos links superiores
$('.rolagem').click(function(){
    //posição vertical do item clicado
    var id = $(this).attr('href');
    var destino = $(id).offset().top;
    $('html, body').animate({
        scrollTop: destino,
    });
});

//Códigos para o formulário

// O texto de txt-idade é o valor do campo idade
$('#txt-idade').text($('#idade').val());

//Evento atualização do campo idade
$('#idade').change(function(){
    $('#txt-idade').text($('#idade').val());
});

// $('#senha2').blur(function(){
//     var senha1 = $('#senha1').val();
//     var senha2 = $('#senha2').val();

//     if(senha1 != senha2)
//     {
//         alert('SENHA NÃO CONFERE');
//     }
// });


// validação de cadastro
(function() {
    'use strict';
    window.addEventListener('load', function() {
      // Pega todos os formulários que nós queremos aplicar estilos de validação Bootstrap personalizados.
      var forms = document.getElementsByClassName('needs-validation');
      // Faz um loop neles e evita o envio
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  })();

  // API DO IBGE

  $.ajax({
    url: 'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome',

    success: function(dados){
      // console.log('<option>'+ dados[7].nome + '</option>');
      var tag = '';
      //laço de repetição executa repetidamente até o final
      for (let i = 0; i < dados.length; i++) {
        tag += '<option value="'+dados[i].id+'">' + dados[i].nome + '</option>';   
    }
      //preenche a lista #estados com a variável tag
      $('#estados').html(tag);
    },
    error: function(msg){
      alert('Não foi possível carregar. Tente mais tarde.');
    }
});
// atualiza cidades quando um estado é selecionado

$('#estados').change(function(){
  var uf = $(this).val();
  var link = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/'+uf+'/municipios';

  $.ajax({
    url: 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/'+uf+'/municipios',

    success: function(dados){
      // console.log('<option>'+ dados[7].nome + '</option>');
      var tag = '';
      //laço de repetição executa repetidamente até o final
      for (let i = 0; i < dados.length; i++) {
        tag += '<option value="'+dados[i].id+'">' + dados[i].nome + '</option>';   
    }
      //preenche a lista #estados com a variável tag
      $('#cidades').html(tag);
    },
    error: function(msg){
      alert('Não foi possível carregar. Tente mais tarde.');
    }
});
});
