import React from 'react';

export const Lens = (props) => {
  //O painel de lentes precisa ser invertido de direção nos dias 14/11 e voltar ao normal dia 27/01, por causa da posição do sol
  //Para isso, adicionamos duas variáveis para esse alerta
  const myDate = new Date();
  //utilizamos o mês 0 porque, para o JavaScript, janeiro é mês 0
  if (myDate.getMonth() === 0){
    if (myDate.getDate() === 24 || myDate.getDate() === 25 || myDate.getDate() === 26 || myDate.getDate() === 27){
      return(
        <div>
          <div className="lens-box">
            <table><tr><th>Tempo total de exposição:</th></tr></table>
            <div className="efeito">{props.time} horas</div>
            <h3> Atenção: girar o painel em direção ao sol no dia 27/01 </h3>
            <h3> Este aviso será mostrado até o dia 27 </h3>
          </div>
        </div>
      )
    }
  }
  //utilizamos o mês 10 porque, para o JavaScript, o ano começa no mês 0 (janeiro), e o mês 10 é novembro
  if (myDate.getMonth() === 10){
    if (myDate.getDate() === 11 || myDate.getDate() === 12 || myDate.getDate() === 13 || myDate.getDate() === 14){
      return(
        <div>
          <div className="lens-box">
            <h3><p>Tempo total de exposição:</p></h3>
            <div className="efeito">{props.time} horas</div>
            <div className="box-uv uv-index-9">
              <h3> Atenção: girar o painel em direção ao sol no dia 14/11 </h3>
              <h3> Este aviso será mostrado até o dia 14 </h3>
            </div>
          </div>
        </div>
      )
    }
  }
  return(
    <div>
      <div className="lens-box">
        <table><tbody><tr><th>Tempo total de exposição:</th></tr></tbody></table>
        <div className="efeito">{props.time} horas</div>
      </div>
    </div>
  )
}
