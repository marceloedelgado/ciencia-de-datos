import React from 'react';
import { 
  Target, 
  HelpCircle, 
  Building, 
  HelpCircle as QuestionIcon,
  Shield, 
  Briefcase, 
  CheckCircle2 
} from 'lucide-react';

function BusinessUnderstanding() {
  const analyticQuestions = [
    {
      id: 1,
      q: '¿Qué países presentan mayor producción de petróleo en los últimos años?',
      a: 'Arabia Saudita, Rusia y Estados Unidos lideran consistentemente la producción en los últimos 25 años. El análisis exploratorio detalla esta concentración extrema del mercado en un puñado de naciones potencia.'
    },
    {
      id: 2,
      q: '¿Cómo evolucionó el consumo de petróleo a nivel global a lo largo del tiempo?',
      a: 'El consumo muestra una clara tendencia de crecimiento de largo plazo, con interrupciones muy marcadas que coinciden con eventos geopolíticos o de crisis (las crisis del petróleo de 1973, la crisis de los 80, la crisis subprime en 2008 y la caída drástica por la pandemia de COVID-19 en 2020).'
    },
    {
      id: 3,
      q: '¿Existe una relación entre el consumo energético total y las emisiones de CO₂?',
      a: 'Sí, el análisis descriptivo y la matriz de correlación del EDA muestran una relación positiva extremadamente estrecha entre las actividades industriales/de consumo energético fósil y la emisión de gases contaminantes a nivel país.'
    },
    {
      id: 4,
      q: '¿Se observan cambios significativos en los datos en eventos recientes?',
      a: 'Efectivamente, se observan anomalías de consumo muy claras durante la pandemia del 2020 y alteraciones de suministro a raíz de tensiones en Ucrania y Medio Oriente en la última década, impactando las series temporales y requiriendo un análisis de robustez en el modelado.'
    }
  ];

  return (
    <div className="tab-content">
      <div className="section-header">
        <span className="section-badge">Fase 1: CRISP-DM</span>
        <h2 className="section-title">Comprensión del Negocio (Business Understanding)</h2>
        <p className="section-subtitle">
          El primer paso en la metodología CRISP-DM consiste en contextualizar el dominio del problema, fijar los objetivos analíticos y definir las preguntas que guiarán el resto del proyecto de Ciencia de Datos.
        </p>
      </div>

      {/* Process Grid */}
      <div className="crisp-grid">
        <div className="crisp-card">
          <div className="crisp-step-num">01</div>
          <h3>Contexto del Problema</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem', fontSize: '0.95rem' }}>
            El análisis del sector energético es crucial debido al rol central del petróleo en la economía global, el desarrollo industrial y su impacto directo en el calentamiento global.
          </p>
          <ul>
            <li>
              <Building size={16} color="var(--primary)" />
              <span><strong>Stakeholders:</strong> Gobiernos, agencias de energía y empresas del sector.</span>
            </li>
            <li>
              <Shield size={16} color="var(--primary)" />
              <span><strong>Sostenibilidad:</strong> Investigadores y analistas de cambio climático.</span>
            </li>
            <li>
              <Briefcase size={16} color="var(--primary)" />
              <span><strong>Impacto:</strong> Evaluaciones geopolíticas y planificación económica.</span>
            </li>
          </ul>
        </div>

        <div className="crisp-card">
          <div className="crisp-step-num">02</div>
          <h3>Formulación del Problema</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem', fontSize: '0.95rem' }}>
            Se busca comprender cuantitativamente cómo evolucionan la producción y el consumo de crudo a nivel global, y modelar su relación matemática con variables macroeconómicas y ambientales clave.
          </p>
          <ul>
            <li>
              <CheckCircle2 size={16} color="var(--primary)" />
              <span>Identificar patrones temporales asimétricos.</span>
            </li>
            <li>
              <CheckCircle2 size={16} color="var(--primary)" />
              <span>Detectar acoples/desacoples entre consumo y PBI.</span>
            </li>
            <li>
              <CheckCircle2 size={16} color="var(--primary)" />
              <span>Evaluar la concentración oligopólica de la producción.</span>
            </li>
          </ul>
        </div>

        <div className="crisp-card">
          <div className="crisp-step-num">03</div>
          <h3>Objetivos del Análisis</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem', fontSize: '0.95rem' }}>
            Establecer lineamientos claros para la extracción de conocimiento accionable, orientados a la toma de decisiones en infraestructura energética y políticas de mitigación.
          </p>
          <ul>
            <li>
              <Target size={16} color="var(--primary)" />
              <span>Analizar tendencias temporales a largo y mediano plazo.</span>
            </li>
            <li>
              <Target size={16} color="var(--primary)" />
              <span>Establecer rankings dinámicos de consumo y producción.</span>
            </li>
            <li>
              <Target size={16} color="var(--primary)" />
              <span>Desarrollar un modelo de regresión para estimar consumo.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Analytical Questions */}
      <div className="card">
        <h3 className="card-title">
          <HelpCircle size={22} color="var(--secondary)" /> Preguntas Analíticas Orientadoras
        </h3>
        <p className="card-subtitle">
          Estas interrogantes actúan como la guía principal para las etapas de preparación, análisis exploratorio y modelado del proyecto.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginTop: '0.5rem' }}>
          {analyticQuestions.map((q) => (
            <div 
              key={q.id} 
              style={{
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '1.5rem',
                backgroundColor: 'var(--bg-main)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                transition: 'all 0.2s ease'
              }}
              className="hover-card-highlight"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span 
                  style={{
                    backgroundColor: 'var(--secondary-light)',
                    color: 'var(--secondary)',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.8rem'
                  }}
                >
                  {q.id}
                </span>
                <span style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-main)' }}>Pregunta Analítica</span>
              </div>
              <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)', lineHeight: 1.3 }}>{q.q}</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '0.5rem' }}>{q.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BusinessUnderstanding;
