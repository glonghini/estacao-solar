import React from 'react';

export const Gate = (props) => {
  //condicionais para ativar o alerta de irregularidades com o estado do portão
  //primeiro caso: portão aberto durante a noite
  if (props.isGateOpen){
    if (props.isDaytime === false) {
      return(
        <div>
      		<div className="box-alerta-gate">
            <div className="aviso">!</div>
          </div>
      		<h3>Portão aberto durante a noite</h3>
          <div className="gate gate-open">
            <div className="portao">Aberto</div>
          </div>
      </div>
      );
    }
  }
  //segundo caso: portão fechado durante o dia
  if (props.isGateOpen === false){
    if (props.isDaytime) {
      //caso esteja chovendo
      if (props.isRaining) {
        return(
          <div>
  		      <div className="box-alerta-gate">
              <div className="aviso">!</div>
            </div>
  		      <h3>Portão fechado durante o dia por causa da chuva</h3>
            <div className="gate gate-closed">
              <div className="portao">Fechado</div>
            </div>
        </div>
        );
      }
      //caso não esteja chovendo
      if (props.isRaining === false) {
        return(
          <div>
            <div className="box-alerta-gate">
              <div className="aviso">!</div>
            </div>
  		      <h3>Portão fechado durante o dia</h3>
            <div className="gate gate-closed">
              <div className="portao">Fechado</div>
            </div>
          </div>
        );
      }
    }
  }
  //terceiro caso: tudo normal durante o dia
  if (props.isGateOpen && props.isDaytime){
    return(
      <div>
        <div className="gate gate-open">
        <div className="portao">Aberto</div>
        </div>
      </div>
    );
  }
  //quarto caso: tudo normal durante a noite
  if (props.isGateOpen === false && props.isDaytime === false) {
    return(
      <div>
        <div className="gate gate-closed">
        <div className="portao">Fechado</div>
        </div>
      </div>
    );
  }
  //quinto caso: caso não seja possível saber o estado do portão por falha no request
  console.log('Não foi possível obter o estado do portão');
  return(
    <div>
      <h3>Não foi possível obter o estado do portão</h3>
    </div>
  );
}
