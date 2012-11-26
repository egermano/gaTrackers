# gaTrackers.js
=============

## Init do gaTrackers
Pra iniciar é só adicionar o gaTrackers.js na página

`<script type="text/javascript" src="gaTrackers.js"></script>`


E depois instanciar o plugin passando um objeto com as opções:

    <script>
        var Tracker = new gaTrackers({UA: 'UA-324244', debug: true})
    </script>



## Trackeando uma página
O track de páginas, recebe apenas um parâmetro. Ex: home

    Tracker.pv('home'); //Trackeamento imediato
    Tracker.when('load', window).pv('home'); //Trackeamento baseado em um evento

## Trackeando um evento
O track de eventos, normalmente acontece baseado em um evento de mouse/teclado. Ex: clique no botão #entrar

    Tracker.event('categoria_do_evento', 'acao_do_evento', 'label_do_evento'); //Trackeamento imediato
    Tracker.when('click', '#entrar').event('categoria_do_evento', 'acao_do_evento', 'label_do_evento'); //Trackeamento baseado em um evento


#### É possível declarar vários trackers ao mesmo tempo, usando o método bind:
Esse método recebe um objeto como parâmetro, onde a chave de cada item é uma string com "evento seletor" e o valor é uma array com os parâmetros na ordem: categoria, acao, label.

    Tracker.bind({
        'click #entrar'     : ['categoria_do_evento', 'acao_do_evento', 'acao_do_evento'],
        'click #sair'       : ['categoria_do_evento', 'acao_do_evento', 'acao_do_evento'],
        'click #ir'         : ['categoria_do_evento', 'acao_do_evento', 'acao_do_evento'],
        'click #voltar'     : ['categoria_do_evento', 'acao_do_evento', 'acao_do_evento'],
        'click #doar'       : ['categoria_do_evento', 'acao_do_evento', 'acao_do_evento']
    })

