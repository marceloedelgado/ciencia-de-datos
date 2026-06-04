import React from 'react';
import {
  CheckCircle2,
  Users,
  Compass,
  Cpu,
  HelpCircle,
  FileText,
  ShieldCheck
} from 'lucide-react';

const TEAM = [
  { name: 'Sergio Nicolas Suarez', role: 'Data Scientist' },
  { name: 'Marcelo Enrique Delgado', role: 'Deployment Strategist' },
  { name: 'Pedro Roberti', role: 'Data Analyst' },
  { name: 'Ezequias Bonvissuto', role: 'Data Architect' }
];

const CONCLUSIONS = [
  {
    title: 'Concentración Oligopólica del Suministro',
    text: 'La producción global de petróleo se concentra en un número sumamente reducido de países. Arabia Saudita, Rusia y EE.UU. actúan como pilares estratégicos de la oferta, exportando no solo crudo físico sino también influyendo geopolíticamente en el mercado global.'
  },
  {
    title: 'Elasticidad de la Demanda ante Crisis',
    text: 'Aunque el consumo global presenta una tendencia de crecimiento lineal de largo plazo, este es sumamente elástico ante crisis globales. Los eventos de 1973, 1982, 2008 y la pandemia del 2020 han dejado marcas de contracción muy visibles en las series temporales.'
  },
  {
    title: 'Acoplamiento Estructural (PBI - CO2 - Petróleo)',
    text: 'La fortísima correlación entre el PBI y las emisiones de gases contaminantes (r = 0.95), y el consumo de petróleo (r = 0.88), evidencia que el crecimiento macroeconómico de las últimas décadas ha estado atado estructuralmente a la quema de combustibles fósiles.'
  },
  {
    title: 'Desafío del Desacoplamiento (Transición Energética)',
    text: 'Para alcanzar metas climáticas globales, el gran desafío de la ciencia de datos y la política pública es diseñar e implementar estrategias de transición que logren un "desacoplamiento" real: permitir el desarrollo económico sin incrementar las emisiones contaminantes.'
  }
];

function TeamTakeaways() {
  return (
    <div className="tab-content">
      <div className="section-header">
        <span className="section-badge">Fase 6: CRISP-DM</span>
        <h2 className="section-title">Conclusiones e Integrantes (Deployment)</h2>
        <p className="section-subtitle">
          Resultados finales del proyecto, perfiles del equipo de trabajo y consideraciones sobre el despliegue del análisis energético.
        </p>
      </div>

      {/* Conclusions grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        {CONCLUSIONS.map((c, i) => (
          <div key={i} className="card" style={{ height: '100%', gap: '1rem', borderTop: '4px solid var(--primary)' }}>
            <h4 style={{ fontFamily: 'var(--font-title)', fontSize: '1.15rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
              <CheckCircle2 size={18} color="var(--primary)" /> {c.title}
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              {c.text}
            </p>
          </div>
        ))}
      </div>

      {/* Team profiles */}
      <div className="card" style={{ marginTop: '1rem' }}>
        <h3 className="card-title">
          <Users size={22} color="var(--primary)" /> Integrantes del Grupo 29
        </h3>
        <p className="card-subtitle">Estudiantes de la Licenciatura en Ciencia de Datos, responsables del desarrollo del análisis estadístico y modelado.</p>

        <div className="team-grid" style={{ marginTop: '1rem' }}>
          {TEAM.map((t) => {
            const initials = t.name.split(' ').map(n => n[0]).join('').substring(0, 3);
            return (
              <div key={t.name} className="team-card">
                <div className="avatar-box">{initials}</div>
                <div className="team-name">{t.name}</div>
                <div className="team-role">{t.role}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Deployment & Tools Callout */}
      <div className="deployment-grid">
        <div className="card">
          <h4 className="card-title" style={{ fontSize: '1.1rem' }}>
            <Compass size={18} color="var(--primary)" /> Fase de Despliegue (Deployment)
          </h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            En la práctica profesional, el despliegue del modelo predictivo de consumo energético se realiza integrando el simulador en tableros de decisión gubernamentales o corporativos. Este desarrollo web sirve como un prototipo comercial (MVP) listo para producción, permitiendo a los tomadores de decisiones simular escenarios de crecimiento de PBI y estimar la demanda petrolera esperada sin necesidad de entornos de código complejos.
          </p>
        </div>

        <div className="card">
          <h4 className="card-title" style={{ fontSize: '1.1rem' }}>
            <ShieldCheck size={18} color="var(--primary)" /> Uso Responsable de Herramientas IA
          </h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            De acuerdo con las directrices académicas y profesionales, se utilizaron herramientas de IA Generativa (principalmente ChatGPT) como apoyo conceptual en la redacción, sugerencia de código base y estructuración. Todo el código, lógica del modelo y conclusiones fueron rigurosamente validados y adaptados por el equipo del Grupo 29.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TeamTakeaways;
