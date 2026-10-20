
/* Mais referências de marcas reais. Linhas específicas só com validação posterior de rótulo. */
const petleleNewBrands=[
['Special Dog','Cães e gatos','Marca de alimentos para cães e gatos; há linhas e apresentações distintas.'],
['Special Cat','Gatos','Linha de alimentos para gatos, com formulações conforme fase e necessidade.'],
['Dog Excellence','Cães','Marca de alimentos caninos com opções de manutenção e fases de vida.'],
['Cat Excellence','Gatos','Marca de alimentos felinos; confirme a versão e a indicação no pacote.'],
['Fórmula Natural','Cães e gatos','Marca com linhas de nutrição para cães e gatos.'],
['Origens','Cães e gatos','Marca de alimentos para cães e gatos; compare a formulação de cada linha.'],
['Three Dogs','Cães','Marca de alimentos para cães com diferentes apresentações.'],
['Three Cats','Gatos','Marca de alimentos para gatos com diferentes apresentações.'],
['Baw Waw','Cães e gatos','Marca de alimentação pet; confira a linha específica.'],
['Birbo','Cães e gatos','Marca de alimentação para cães e gatos.'],
['Finotrato','Cães e gatos','Marca de alimentos pet com linhas para diferentes perfis.'],
['Monello','Cães e gatos','Marca de alimentos pet; confira a fase de vida no rótulo.'],
['Monello Select','Cães e gatos','Linha comercial da família Monello; verifique apresentação.'],
['Equilíbrio','Cães e gatos','Marca de alimentos pet com formulações por perfil.'],
['Total Alimentos','Cães e gatos','Fabricante do setor de nutrição pet; confira a marca e a linha exatas.'],
['Hercosul','Cães e gatos','Empresa do setor de alimentos pet; confira o produto comercial específico.'],
['Adimax','Cães e gatos','Fabricante de alimentos pet; a composição depende da marca e da linha.'],
['Dog Chow','Cães','Linha de alimentos caninos associada à Purina.'],
['Cat Chow','Gatos','Linha de alimentos felinos associada à Purina.'],
['Pro Plan','Cães e gatos','Linha de nutrição pet da Purina com produtos para diferentes necessidades.'],
['Excellent','Cães e gatos','Linha de alimentos pet da Purina; confirmar versão no rótulo.'],
['Hill’s Science Diet','Cães e gatos','Linha de alimentos de manutenção da Hill’s.'],
['Hill’s Prescription Diet','Dietas veterinárias','Linha de dietas veterinárias; utilização conforme avaliação veterinária.'],
['Eukanuba','Cães','Marca de alimentação para cães; linhas variam por porte e idade.'],
['Frost','Cães e gatos','Marca de alimentos para cães e gatos; confirme composição da apresentação.'],
['Naturalis','Cães e gatos','Marca de alimentos pet com diferentes formulações.'],
['Keldog','Cães','Marca de alimentos e petiscos para cães.'],
['Kelcat','Gatos','Marca de alimentos e petiscos para gatos.'],
['Sabor & Vida','Cães e gatos','Marca de alimentos pet; confira espécie e linha no pacote.'],
['Nutrópica','Aves','Marca de nutrição para aves; cada espécie exige alimento adequado.'],
['Megazoo','Aves e pequenos animais','Marca de nutrição para aves e pequenos animais.'],
['Alcon','Aves e peixes','Marca de alimentos e produtos para aves e aquarismo.'],
['Reino das Aves','Aves','Marca de alimentos para pássaros; conferir espécie e apresentação.'],
['Pássaro Forte','Aves','Marca de alimentos para aves; confirmar produto e espécie no rótulo.'],
['Zootekna','Aves','Marca de nutrição para aves; conferir a linha específica.']
];
const petleleExisting=new Set(rows.map(r=>normalized(r.name)));
for(const [brand,animal,about] of petleleNewBrands){
 const name=brand+' — guia da marca';
 if(petleleExisting.has(normalized(name)))continue;
 rows.push({cat:animal.includes('Aves')?'Aves ornamentais e silvestres':'Rações pet',icon:animal.includes('Aves')?'🐦':'🐾',brand,name,
 desc:about+' Guia de marca, não ficha de uma embalagem específica.',
 func:'A função da ração depende da fórmula e do animal: proteínas fornecem aminoácidos, gorduras fornecem energia e vitaminas/minerais auxiliam funções do organismo. A composição muda de produto para produto.',
 uso:'Identifique a espécie, idade, porte, condição corporal e eventual necessidade clínica. Escolha a linha adequada e siga a tabela do fabricante no pacote; ofereça água fresca. Faça troca gradual quando indicada.',
 curiosidade:'Uma mesma marca pode vender rações de categorias, composições e faixas de preço muito diferentes. O nome da marca sozinho não define a qualidade ou a indicação.',
 cuidados:'Esta ficha apresenta a marca, não confirma a disponibilidade atual nem a composição de um produto. Dietas veterinárias precisam de indicação profissional; não invente quantidade ou composição.',
 verified:'Guia introdutório de marca, não rótulo verificado.'});
}
function petleleFind(q){const norm=normalized(q);const tokens=norm.replace(/[^a-z0-9 ]/g,' ').split(/\s+/).filter(w=>w.length>=3&&!['qual','como','para','esse','essa','produto','marca','racao','ração','sobre','usar','serve','quero','saber','mais','uma','tem','entre','diferença','diferenca','cuidados','curiosidades','funciona','indicado'].includes(w));
 return rows.map(r=>{const name=normalized(r.name),brand=normalized(r.brand),body=normalized(r.desc+' '+r.cat);let score=0;if(norm.includes(name)&&name.length>5)score+=25;for(const t of tokens){if(name.includes(t))score+=7;else if(brand.includes(t))score+=5;else if(body.includes(t))score+=1}return {r,score}}).sort((a,b)=>b.score-a.score)}
function petleleHelpAnswer(question){const q=normalized(question), ranked=petleleFind(question),top=ranked[0];
 if(/(misturar|mistura|cloro.*acido|acido.*cloro)/.test(q))return '⚠️ Segurança: nunca misture cloro com ácidos ou outros químicos de piscina. Siga a embalagem, use proteção indicada e mantenha os produtos separados.';
 if(/(qual.*(melhor|indica|recomenda)|recomenda.*racao)/.test(q)&&!/(royal|golden|purina|whiskas|premier|magnus)/.test(q))return '🐾 Para orientar uma ração, pergunte: espécie, idade, peso, porte, castração, condições de saúde, alimento atual e orçamento. Não existe uma marca ideal para todos. Se houver doença, encaminhe ao veterinário.';
 if(!top||top.score<4)return 'Não encontrei uma ficha suficientemente relacionada. Escreva o nome da marca ou produto (ex.: Monello, Golden, cloro granulado, ureia). Também posso explicar como comparar rações e o que perguntar ao cliente.';
 const r=top.r;let detail='';
 if(/(compar|diferenc)/.test(q))detail='Compare espécie, fase de vida, indicação, ingredientes, níveis de garantia, energia metabolizável, porção diária e preço por kg. Duas linhas da mesma marca podem ser muito diferentes.\n\n'+r.desc;
 else if(/(curios|historia|sabia)/.test(q))detail=r.curiosidade;
 else if(/(cuidado|contraindic|risco|perigo|segur)/.test(q))detail=r.cuidados;
 else if(/(uso|usar|dar|oferec|aplic|dose|dosag|quantidade)/.test(q))detail=r.uso;
 else if(/(funciona|serve|efeito|acao|compos)/.test(q))detail=r.func;
 else detail=r.desc+'\n\n⚙️ COMO FUNCIONA\n'+r.func+'\n\n📋 COMO USAR\n'+r.uso+'\n\n💡 CURIOSIDADE\n'+r.curiosidade+'\n\n⚠️ CUIDADOS\n'+r.cuidados;
 return '🦴 '+r.name+'\n\n'+detail+'\n\n📚 Fonte: biblioteca interna PETLELE. Informações educativas; confira rótulo/bula da apresentação específica.';
}
askPet=function(e){e.preventDefault();const input=document.getElementById('chatq');const q=input.value.trim();if(!q)return;const log=document.getElementById('chatlog');for(const [msg,cls] of [[q,'human'],[petleleHelpAnswer(q),'bot']]){const el=document.createElement('div');el.className='bubble '+cls;el.textContent=msg;log.appendChild(el)}input.value='';log.scrollTop=log.scrollHeight};
const petleleHelpSection=document.getElementById('assistant-section');
if(petleleHelpSection){const panel=document.createElement('div');panel.className='pet-help-banner';panel.innerHTML='<strong>💛 Ajuda PETLELE — modo balcão</strong><br>Pesquise uma marca ou pergunte como orientar um cliente. A resposta usa apenas o catálogo interno, sem inventar fórmulas, doses ou diagnósticos.';const tips=document.createElement('div');tips.className='pet-help-tips';const prompts=[['🐕 Escolher ração','Qual ração recomenda para cachorro?'],['⚖️ Comparar marcas','Como comparar duas rações?'],['💊 Cuidados veterinários','Cuidados com vermífugo'],['🌱 Entender NPK','Como funciona fertilizante 04-14-08?'],['🏊 Segurança na piscina','Posso misturar cloro com ácido?'],['🐦 Ração de pássaros','Como usar ração para calopsita?']];for(const [label,prompt] of prompts){const b=document.createElement('button');b.type='button';b.textContent=label;b.addEventListener('click',()=>{document.getElementById('chatq').value=prompt;askPet(new Event('submit'))});tips.appendChild(b)}petleleHelpSection.insertBefore(panel,petleleHelpSection.querySelector('.chatlog'));petleleHelpSection.insertBefore(tips,petleleHelpSection.querySelector('.chatinput'))}
init();
