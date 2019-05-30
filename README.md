# MrBot Gerenciador de orçamentos

MrBot é um bot para Telegram, onde você pode adicionar os seus gastos mensais para controlar suas despesas. O monitoramento é feito por categorias que você mesmo cria e ainda pode criar objetivos para planejar suas metas.

## Como Usar

1. Adicione o bot ao seu Telegram
2. Digite `/start` para começar a conversar
3. Selecione a moeda que será usada nas suas transações
4. Adicione as categorias e os respectivos orçamentos que você gostaria de registrar
5. Adicione os objetivos que você gostaria de realizar
6. Comece a registrar as despesas

### Despesas

Despesas precisam de um valor e uma categoria para a qual vão ser computadas.

#### Adicionando gastos

```md
__você__: gastei {valor} com {categoria}
__bot__: despesa salva! Você já gastou {percentagem}% dessa categoria para esse mês! Um total de R$ {valor}.
```

#### Editando gastos

```md
__você__: corrigir despesa
__bot__: qual despesa você gostaria de corrigir?
\1 supermercado 10
\2 bar 10
...
__você__: \1
__bot__: Ok! Digite a despesa novamente
__você__: supermercado 30
__bot__: Despesa corrigida!
```

#### Removendo gastos

```md
__você__: remover despesa
__bot__: qual despesa você gostaria de remover?
\1 supermercado 10
\2 bar 10
...
__você__: \1
__bot__: Ok! Despesa removida! O total para a {categoria} é {valor} {moeda}
```

### Categorias

Categorias precisam de um nome e um limite mensal para o mês. Sempre no último dia do mês o bot te mostrará todas as categorias com os valores mensais e você poderá configurar valores diferentes para cada categoria para o próximo mês.

#### Criar Categoria

```md
__você__: criar categoria supermercado 100
__bot__: Ok! Categoria criada! Esse mês você poderá gastar 100 reais em supermercado.
```

#### Editar Categoria

```md
__você__: corrigir categoria
__bot__: qual categoria você gostaria de corrigir?
\1 supermercad1342 100
\2 bares 50
\3 saúde 100
\4 academia 70
...
__você__: \2
__bot__: Ok! Digite a categoria novamente
__você__: supermercado 100
__bot__: Categoria corrigida!
```

#### Remover categoria

```md
__você__: remover categoria
__bot__: qual categoria você gostaria de remover?
\1 supermercado 100
\2 bar 50
...
__você__: \1
__bot__: Ok! Categoria removida!
```

#### Resultados da categoria

```md
__você__: mostrar supermercado
__bot__: Você já gastou 5% dessa categoria para esse mês! Um total de R$ 5,00
```

### Objetivos

TBD

## Contribuindo

Node: `12.3.1`
Mongodb: `4.0.8`

1. Faça um fork do repositório
2. Clone o repositório que você agora possui
3. `npm install`
4. Implemente e comite suas mudanças
5. Crie um Pull request
6. Aguarde a revisão do PR :)
