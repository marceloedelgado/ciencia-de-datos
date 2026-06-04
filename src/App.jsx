import React, { useState, useEffect } from 'react';
import {
  Flame,
  BookOpen,
  Database,
  Brain,
  Users,
  TrendingUp,
  ArrowRight,
  Info,
  Calendar,
  Globe,
  Award,
  Menu,
  X
} from 'lucide-react';
import BusinessUnderstanding from './components/BusinessUnderstanding';
import InteractiveCharts from './components/InteractiveCharts';
import ModelPredictor from './components/ModelPredictor';
import TeamTakeaways from './components/TeamTakeaways';

function App() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { id: 'inicio', label: 'Inicio', icon: Flame },
    { id: 'negocio', label: 'Comprensión', icon: BookOpen },
    { id: 'datos', label: 'Datos (EDA)', icon: Database },
    { id: 'modelado', label: 'Modelado', icon: Brain },
    { id: 'conclusiones', label: 'Conclusiones', icon: Users }
  ];

  // Scroll Spy logic to highlight active section on the navbar
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'negocio', 'datos', 'modelado', 'conclusiones'];
      // Vertical scroll position + offset to match screen middle
      const scrollPosition = window.scrollY + 250;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-container">
      {/* Sticky Top Navbar */}
      <nav className="navbar">
        <div className="navbar-logo" onClick={() => { scrollToSection('inicio'); setMenuOpen(false); }} style={{ cursor: 'pointer' }}>
          <Flame color="#0f766e" size={24} />
          <h1>Energy Analytics - G29</h1>
        </div>

        <button className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
          {menuItems.map((item) => {
            return (
              <li key={item.id} className={`navbar-item ${activeSection === item.id ? 'active' : ''}`}>
                <button onClick={() => { scrollToSection(item.id); setMenuOpen(false); }}>
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Main Scrollable Content */}
      <main className="main-content">

        {/* Section 1: Landing (Inicio) */}
        <section id="inicio" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          <div className="hero-container">
            <div className="hero-info">
              <span className="section-badge">
                <Award size={14} /> Trabajo Práctico Integrador
              </span>
              <h2>
                Análisis Global de <span>Producción y Consumo</span> de Petróleo
              </h2>
              <p>
                Una plataforma interactiva de visualización y modelado de datos energéticos globales. Explora el comportamiento histórico del petróleo, su correlación con el PBI y emisiones, y experimenta con nuestro simulador predictivo basado en Machine Learning.
              </p>
              <div className="hero-actions">
                <button className="btn btn-primary" onClick={() => scrollToSection('datos')}>
                  Ver Gráficos Interactivos <ArrowRight size={18} />
                </button>
                <button className="btn btn-secondary" onClick={() => scrollToSection('modelado')}>
                  Probar Simulador
                </button>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-stats-card">
                <div className="stat-item">
                  <span className="stat-val">34+</span>
                  <span className="stat-lbl">Años de Datos (1990 - 2024)</span>
                </div>
                <div className="stat-item" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
                  <span className="stat-val accent">7,600+</span>
                  <span className="stat-lbl">Registros Históricos Limpios</span>
                </div>
                <div className="stat-item" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
                  <span className="stat-val">0.892</span>
                  <span className="stat-lbl">Precisión de Regresión ($R^2$)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Context Grid */}
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-icon-box teal">
                <Globe size={24} />
              </div>
              <div className="metric-info">
                <span className="metric-title">Fuente de Datos</span>
                <span className="metric-value" style={{ fontSize: '1.5rem', margin: '0.4rem 0' }}>Our World in Data</span>
                <span className="metric-desc">Dataset oficial de energía global (EDAP).</span>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon-box amber">
                <TrendingUp size={24} />
              </div>
              <div className="metric-info">
                <span className="metric-title">Metodología</span>
                <span className="metric-value" style={{ fontSize: '1.5rem', margin: '0.4rem 0' }}>CRISP-DM Cycle</span>
                <span className="metric-desc">De la comprensión de negocio al modelado predictivo.</span>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon-box teal">
                <Calendar size={24} />
              </div>
              <div className="metric-info">
                <span className="metric-title">Último Año de Datos</span>
                <span className="metric-value" style={{ fontSize: '1.5rem', margin: '0.4rem 0' }}>2024</span>
                <span className="metric-desc">Incluye eventos recientes como la pandemia y conflictos.</span>
              </div>
            </div>
          </div>

          {/* Introduction Card */}
          <div className="card">
            <h3 className="card-title">
              <Info size={20} color="var(--primary)" /> Resumen Ejecutivo
            </h3>
            <p style={{ color: 'var(--text-muted)' }}>
              Este trabajo práctico aborda el dominio de la energía y la economía global, analizando la producción y el consumo de petróleo junto con variables económicas (PBI) y ambientales (emisiones de gases de efecto invernadero). A través del ciclo metodológico CRISP-DM, realizamos una exploración minuciosa de datos (EDA) para identificar los grandes productores y la asimetría del mercado, seguido por el desarrollo de un modelo de regresión lineal unificado para predecir el consumo de crudo. Desplázate hacia abajo para ver el análisis de datos paso a paso o utiliza el menú de navegación superior.
            </p>
          </div>
        </section>

        {/* Section 2: Business Understanding */}
        <section id="negocio">
          <BusinessUnderstanding />
        </section>

        {/* Section 3: Exploratory Data Analysis */}
        <section id="datos">
          <InteractiveCharts />
        </section>

        {/* Section 4: Predictive Modeling */}
        <section id="modelado">
          <ModelPredictor />
        </section>

        {/* Section 5: Conclusions & Team */}
        <section id="conclusiones" style={{ paddingBottom: '4rem' }}>
          <TeamTakeaways />
        </section>
      </main>
    </div>
  );
}

export default App;
