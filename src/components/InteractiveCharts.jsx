import React, { useState, useMemo } from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  AreaChart, 
  Area,
  BarChart,
  Bar
} from 'recharts';
import { 
  TrendingUp, 
  Map, 
  Sliders, 
  Grid, 
  HelpCircle,
  BarChart3,
  Calendar,
  AlertTriangle,
  Info
} from 'lucide-react';
import cleanData from '../data/energy_clean_data.json';

// Static precalculated global oil consumption data (1965-2024) in TWh
const globalConsumptionData = [
  { year: 1965, consumption: 15415.74 },
  { year: 1966, consumption: 16662.36 },
  { year: 1967, consumption: 17787.63 },
  { year: 1968, consumption: 19334.77 },
  { year: 1969, consumption: 21076.36 },
  { year: 1970, consumption: 22978.57 },
  { year: 1971, consumption: 24173.34 },
  { year: 1972, consumption: 26080.48 },
  { year: 1973, consumption: 28139.65 },
  { year: 1974, consumption: 27245.55 },
  { year: 1975, consumption: 26817.25 },
  { year: 1976, consumption: 28705.92 },
  { year: 1977, consumption: 29597.58 },
  { year: 1978, consumption: 30768.47 },
  { year: 1979, consumption: 31081.88 },
  { year: 1980, consumption: 29222.77 },
  { year: 1981, consumption: 27868.94 },
  { year: 1982, consumption: 26905.17 },
  { year: 1983, consumption: 26792.90 },
  { year: 1984, consumption: 27320.47 },
  { year: 1985, consumption: 32078.83 },
  { year: 1986, consumption: 33106.55 },
  { year: 1987, consumption: 33843.09 },
  { year: 1988, consumption: 34923.74 },
  { year: 1989, consumption: 35494.72 },
  { year: 1990, consumption: 36243.29 },
  { year: 1991, consumption: 36279.54 },
  { year: 1992, consumption: 36858.59 },
  { year: 1993, consumption: 36707.48 },
  { year: 1994, consumption: 37511.03 },
  { year: 1995, consumption: 38062.92 },
  { year: 1996, consumption: 38918.39 },
  { year: 1997, consumption: 39926.74 },
  { year: 1998, consumption: 40000.74 },
  { year: 1999, consumption: 40638.18 },
  { year: 2000, consumption: 41119.41 },
  { year: 2001, consumption: 41402.81 },
  { year: 2002, consumption: 41669.43 },
  { year: 2003, consumption: 42533.33 },
  { year: 2004, consumption: 44257.29 },
  { year: 2005, consumption: 44754.45 },
  { year: 2006, consumption: 45116.42 },
  { year: 2007, consumption: 45738.76 },
  { year: 2008, consumption: 45306.30 },
  { year: 2009, consumption: 44220.50 },
  { year: 2010, consumption: 45739.62 },
  { year: 2011, consumption: 46135.95 },
  { year: 2012, consumption: 46857.12 },
  { year: 2013, consumption: 47372.59 },
  { year: 2014, consumption: 47720.16 },
  { year: 2015, consumption: 48629.48 },
  { year: 2016, consumption: 49646.67 },
  { year: 2017, consumption: 50499.86 },
  { year: 2018, consumption: 50903.97 },
  { year: 2019, consumption: 51043.57 },
  { year: 2020, consumption: 46393.50 },
  { year: 2021, consumption: 48970.32 },
  { year: 2022, consumption: 50566.91 },
  { year: 2023, consumption: 51820.62 },
  { year: 2024, consumption: 52183.05 }
];

// Historical milestones annotations info
const historicalMilestones = {
  1973: {
    year: '1973 - 1974',
    title: 'Primera Crisis del Petróleo',
    desc: 'Embargo petrolero de la OPEP durante la guerra de Yom Kipur. El precio del barril se cuadruplicó, provocando una caída visible en el consumo global y una estanflación económica generalizada.'
  },
  1980: {
    year: '1979 - 1982',
    title: 'Segunda Crisis y Superávit de los 80',
    desc: 'La revolución iraní y la guerra Irán-Irak recortaron la producción. Posteriormente, la sobreproducción en los 80 causó un colapso en el precio del crudo y una fuerte contracción temporal de la demanda.'
  },
  2008: {
    year: '2008 - 2009',
    title: 'Gran Crisis Financiera (Subprime)',
    desc: 'El colapso de Lehman Brothers y la recesión económica mundial detuvieron la demanda global de petróleo, generando una notable contracción antes de una rápida recuperación liderada por mercados emergentes.'
  },
  2020: {
    year: '2020',
    title: 'Pandemia COVID-19',
    desc: 'Medidas globales de confinamiento y parálisis del transporte aéreo y terrestre causaron la mayor caída histórica en el consumo de petróleo en un solo año, cayendo más de 4,600 TWh.'
  }
};

// Box plot stats calculated in Python
const boxPlotData = [
  { category: 'Bajo', min: 0.003, q1: 0.628, median: 2.567, q3: 8.318, max: 12.808, mean: 4.301 },
  { category: 'Medio-Bajo', min: 12.827, q1: 22.877, median: 34.593, q3: 48.893, max: 71.839, mean: 36.729 },
  { category: 'Medio-Alto', min: 71.955, q1: 135.360, median: 215.351, q3: 387.172, max: 537.526, mean: 259.979 },
  { category: 'Alto', min: 538.547, q1: 922.730, median: 1467.586, q3: 2221.014, max: 9977.384, mean: 2052.053 }
];

// Correlation matrix data from Python
const correlationMatrix = {
  labels: ['Producción Oil', 'Consumo Oil', 'Emisiones CO2', 'Población', 'PBI'],
  matrix: [
    [1.00, 0.62, 0.44, 0.25, 0.53], // oil_production
    [0.62, 1.00, 0.85, 0.43, 0.88], // oil_consumption
    [0.44, 0.85, 1.00, 0.76, 0.95], // greenhouse_gas_emissions
    [0.25, 0.43, 0.76, 1.00, 0.62], // population
    [0.53, 0.88, 0.95, 0.62, 1.00]  // gdp
  ]
};

// Filter out years beyond 2024 since data is null/incomplete
const filteredData = cleanData.filter(d => d.year <= 2024);

function InteractiveCharts() {
  const [selectedMilestone, setSelectedMilestone] = useState(historicalMilestones[2020]);
  const [selectedCountry, setSelectedCountry] = useState('United States');
  const [rankingYear, setRankingYear] = useState(2022);
  const [rankingType, setRankingType] = useState('production'); // 'production' | 'consumption'

  // Get list of unique countries with valid code
  const countries = useMemo(() => {
    const list = Array.from(new Set(filteredData.map(d => d.country))).sort();
    // Filter out entities that are not actual single countries (e.g. global regions if any, but cleanData already filtered iso_code.notna)
    return list.filter(c => c !== 'World' && c !== 'High-income countries' && c !== 'Europe');
  }, []);

  // Filter historical data for selected country
  const countryHistory = useMemo(() => {
    return filteredData
      .filter(d => d.country === selectedCountry)
      .map(d => ({
        year: d.year,
        production: d.oil_production || 0,
        consumption: d.oil_consumption || 0,
        population: d.population || 0,
        gdp: d.gdp || 0
      }))
      .sort((a, b) => a.year - b.year);
  }, [selectedCountry]);

  // Compute average stats for selected country
  const countryStats = useMemo(() => {
    if (countryHistory.length === 0) return { avgProd: 0, avgCons: 0, surplus: 0 };
    const validProd = countryHistory.filter(h => h.production > 0);
    const validCons = countryHistory.filter(h => h.consumption > 0);
    
    const avgProd = validProd.reduce((sum, h) => sum + h.production, 0) / (validProd.length || 1);
    const avgCons = validCons.reduce((sum, h) => sum + h.consumption, 0) / (validCons.length || 1);
    
    const latest = countryHistory[countryHistory.length - 1];
    const surplus = latest.production - latest.consumption;

    return {
      avgProd,
      avgCons,
      surplus,
      latestYear: latest.year,
      latestPopulation: latest.population,
      latestGdp: latest.gdp
    };
  }, [countryHistory]);

  // Filter rankings for dynamic bar chart
  const rankingData = useMemo(() => {
    const yearData = filteredData.filter(d => d.year === rankingYear && d.country !== 'World');
    const sorted = [...yearData].sort((a, b) => {
      const valA = rankingType === 'production' ? (a.oil_production || 0) : (a.oil_consumption || 0);
      const valB = rankingType === 'production' ? (b.oil_production || 0) : (b.oil_consumption || 0);
      return valB - valA;
    });

    return sorted.slice(0, 10).map(d => ({
      name: d.country,
      value: rankingType === 'production' ? (d.oil_production || 0) : (d.oil_consumption || 0)
    }));
  }, [rankingYear, rankingType]);

  // Helper for heatmap cell colors (Teal palette)
  const getHeatmapColor = (val) => {
    if (val === 1.0) return 'rgba(15, 118, 110, 0.95)';
    if (val >= 0.85) return 'rgba(15, 118, 110, 0.8)';
    if (val >= 0.70) return 'rgba(15, 118, 110, 0.65)';
    if (val >= 0.50) return 'rgba(15, 118, 110, 0.5)';
    if (val >= 0.40) return 'rgba(15, 118, 110, 0.35)';
    return 'rgba(15, 118, 110, 0.15)';
  };

  const CustomChartTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-year">{`Año: ${label}`}</p>
          {payload.map((p, index) => (
            <div key={index} className="tooltip-row">
              <span className="label" style={{ color: p.color }}>{p.name}:</span>
              <span className="value">{`${p.value.toLocaleString(undefined, { maximumFractionDigits: 1 })} TWh`}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="tab-content">
      <div className="section-header">
        <span className="section-badge">Fase 2: CRISP-DM</span>
        <h2 className="section-title">Análisis Exploratorio de Datos (EDA)</h2>
        <p className="section-subtitle">
          Exploración visual e interactiva del comportamiento global del petróleo. Alterna entre las diferentes visualizaciones descriptivas desarrolladas durante el trabajo.
        </p>
      </div>

      {/* 1. Global Consumption Chart */}
      <div className="card">
        <h3 className="card-title">
          <TrendingUp size={22} color="var(--primary)" /> Evolución del Consumo Global de Petróleo (1965 - 2024)
        </h3>
        <p className="card-subtitle">
          Observe la tendencia ascendente interrumpida por hitos y crisis socioeconómicas mundiales. Haga clic en los botones de hitos para ver el contexto geopolítico.
        </p>

        <div style={{ height: '350px', width: '100%', marginTop: '1rem' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={globalConsumptionData} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCons" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--secondary)" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="var(--secondary)" stopOpacity={0.02}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
              <XAxis dataKey="year" tickLine={false} tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
              <YAxis 
                tickLine={false} 
                tick={{ fontSize: 11, fill: 'var(--text-muted)' }} 
                axisLine={false}
                unit=" TWh"
              />
              <Tooltip content={<CustomChartTooltip />} />
              <Area 
                name="Consumo Global" 
                type="monotone" 
                dataKey="consumption" 
                stroke="var(--secondary)" 
                strokeWidth={2.5}
                fillOpacity={1} 
                fill="url(#colorCons)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Milestone Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.5rem' }}>
            {Object.keys(historicalMilestones).map((yr) => (
              <button
                key={yr}
                onClick={() => setSelectedMilestone(historicalMilestones[yr])}
                className={`preset-btn ${selectedMilestone.year.includes(yr) ? 'active' : ''}`}
                style={{
                  backgroundColor: selectedMilestone.year.includes(yr) ? 'var(--secondary-light)' : '#ffffff',
                  color: selectedMilestone.year.includes(yr) ? 'var(--secondary)' : 'var(--text-main)',
                  borderColor: selectedMilestone.year.includes(yr) ? 'var(--secondary)' : 'var(--border-color)',
                  fontWeight: 600
                }}
              >
                Hito {yr}
              </button>
            ))}
          </div>

          {selectedMilestone && (
            <div className="callout warning">
              <AlertTriangle size={20} color="var(--secondary)" style={{ flexShrink: 0 }} />
              <div className="callout-content">
                <span className="callout-title" style={{ color: 'var(--secondary)' }}>
                  {selectedMilestone.title} ({selectedMilestone.year})
                </span>
                <span className="callout-text">{selectedMilestone.desc}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. Country Comparer & Rankings Row */}
      <div className="dashboard-row">
        
        {/* Country Comparer */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <h3 className="card-title">
              <Map size={22} color="var(--primary)" /> Producción vs. Consumo por País
            </h3>
            
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="select-input"
              style={{ minWidth: '180px' }}
            >
              {countries.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <p className="card-subtitle">
            Compare la evolución histórica de producción de petróleo (línea sólida) contra su consumo interno (línea punteada).
          </p>

          <div style={{ height: '280px', width: '100%' }}>
            {countryHistory.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={countryHistory} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                  <XAxis dataKey="year" tickLine={false} tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
                  <YAxis tickLine={false} tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} />
                  <Tooltip content={<CustomChartTooltip />} />
                  <Legend iconType="circle" />
                  <Line 
                    name="Producción" 
                    type="monotone" 
                    dataKey="production" 
                    stroke="var(--primary)" 
                    strokeWidth={2.5}
                    dot={{ r: 3 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    name="Consumo" 
                    type="monotone" 
                    dataKey="consumption" 
                    stroke="var(--secondary)" 
                    strokeWidth={2.5}
                    strokeDasharray="5 5"
                    dot={{ r: 3 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', color: 'var(--text-light)' }}>
                Sin datos disponibles para este país.
              </div>
            )}
          </div>

          {/* Quick country summary stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Promedio de Producción</span>
              <strong style={{ fontSize: '1.2rem', color: 'var(--primary)' }}>
                {countryStats.avgProd ? `${countryStats.avgProd.toLocaleString(undefined, { maximumFractionDigits: 1 })} TWh` : '0 TWh'}
              </strong>
            </div>
            <div style={{ textAlign: 'center', borderLeft: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Promedio de Consumo</span>
              <strong style={{ fontSize: '1.2rem', color: 'var(--secondary)' }}>
                {countryStats.avgCons ? `${countryStats.avgCons.toLocaleString(undefined, { maximumFractionDigits: 1 })} TWh` : '0 TWh'}
              </strong>
            </div>
            <div style={{ textAlign: 'center', borderLeft: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Balance (Prod - Cons) {countryStats.latestYear}</span>
              <strong style={{ fontSize: '1.2rem', color: countryStats.surplus >= 0 ? '#10b981' : '#ef4444' }}>
                {countryStats.surplus ? `${countryStats.surplus >= 0 ? '+' : ''}${countryStats.surplus.toLocaleString(undefined, { maximumFractionDigits: 1 })} TWh` : '0 TWh'}
              </strong>
            </div>
          </div>
        </div>

        {/* Dynamic Rankings */}
        <div className="card">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className="card-title" style={{ margin: 0 }}>
                <BarChart3 size={22} color="var(--primary)" /> Top 10 Global
              </h3>
              <div className="btn-toggle-group">
                <button 
                  className={`btn-toggle ${rankingType === 'production' ? 'active' : ''}`}
                  onClick={() => setRankingType('production')}
                >
                  Prod
                </button>
                <button 
                  className={`btn-toggle ${rankingType === 'consumption' ? 'active' : ''}`}
                  onClick={() => setRankingType('consumption')}
                >
                  Cons
                </button>
              </div>
            </div>
            <p className="card-subtitle">
              Los principales actores energéticos globales en el año seleccionado.
            </p>
          </div>

          <div style={{ height: '220px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rankingData} layout="vertical" margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={80} tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: 'var(--text-muted)' }} />
                <Tooltip formatter={(value) => [`${value.toLocaleString(undefined, { maximumFractionDigits: 1 })} TWh`, rankingType === 'production' ? 'Producción' : 'Consumo']} />
                <Bar 
                  dataKey="value" 
                  fill={rankingType === 'production' ? 'var(--primary)' : 'var(--secondary)'} 
                  radius={[0, 4, 4, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Year slider */}
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Calendar size={14} /> Año seleccionado:
              </span>
              <strong style={{ fontSize: '1.1rem', color: 'var(--primary)' }}>{rankingYear}</strong>
            </div>
            <input 
              type="range" 
              min={1990} 
              max={2024} 
              value={rankingYear} 
              onChange={(e) => setRankingYear(parseInt(e.target.value))}
              className="range-input" 
            />
          </div>
        </div>
      </div>

      {/* 3. Heatmap & Custom Boxplot row */}
      <div className="dashboard-row reverse-ratio">
        
        {/* Heatmap Matrix */}
        <div className="card">
          <h3 className="card-title">
            <Grid size={22} color="var(--primary)" /> Matriz de Correlación del EDA
          </h3>
          <p className="card-subtitle">
            Relación lineal entre las variables seleccionadas. Coeficientes cercanos a 1.0 indican una correlación positiva fuerte.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '0.5rem' }}>
            {/* Headers row */}
            <div className="heatmap-grid" style={{ gridTemplateColumns: '1.2fr repeat(5, 1fr)' }}>
              <div className="heatmap-cell header" style={{ minHeight: '40px', padding: '0.25rem' }}>Variable</div>
              {correlationMatrix.labels.map(l => (
                <div key={l} className="heatmap-cell header" style={{ minHeight: '40px', padding: '0.25rem', fontSize: '0.75rem', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                  {l}
                </div>
              ))}
            </div>

            {/* Matrix rows */}
            {correlationMatrix.labels.map((rowLabel, i) => (
              <div key={rowLabel} className="heatmap-grid" style={{ gridTemplateColumns: '1.2fr repeat(5, 1fr)', marginTop: '-1rem' }}>
                {/* Row label */}
                <div className="heatmap-cell header" style={{ fontSize: '0.8rem', justifyContent: 'flex-start', alignItems: 'flex-start', padding: '0.5rem 0.75rem', minHeight: '50px' }}>
                  {rowLabel}
                </div>
                {/* Cells */}
                {correlationMatrix.matrix[i].map((val, j) => (
                  <div 
                    key={j} 
                    className="heatmap-cell"
                    style={{
                      backgroundColor: getHeatmapColor(val),
                      color: val >= 0.7 ? '#ffffff' : 'var(--text-main)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      minHeight: '50px',
                      cursor: 'help'
                    }}
                    title={`${rowLabel} vs ${correlationMatrix.labels[j]}: ${val.toFixed(2)}`}
                  >
                    {val.toFixed(2)}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="callout" style={{ borderLeftColor: 'var(--primary-hover)', backgroundColor: 'var(--bg-main)' }}>
            <Info size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
            <div className="callout-content">
              <span className="callout-text" style={{ fontSize: '0.8rem' }}>
                <strong>Hallazgo Senior:</strong> Las emisiones de CO2 y el PBI tienen una correlación de <strong>0.95</strong>, y el consumo de petróleo con el PBI de <strong>0.88</strong>. Esto evidencia un alto acoplamiento histórico entre el crecimiento económico nacional, el consumo energético de combustibles fósiles y la huella ambiental consecuente.
              </span>
            </div>
          </div>
        </div>

        {/* Custom Box Plot */}
        <div className="card">
          <h3 className="card-title">
            <Sliders size={22} color="var(--primary)" /> Dispersión de Producción por Nivel de Productor
          </h3>
          <p className="card-subtitle">
            Representación de la asimetría y el rango intercuartílico (IQR). Pasa el cursor por las cajas para ver estadísticas detalladas.
          </p>

          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: '260px', borderBottom: '2px solid var(--border-color)', paddingBottom: '1rem', marginTop: '1.5rem', position: 'relative' }}>
            
            {boxPlotData.map((data, index) => {
              // Custom SVG scale mapping (using log-like scaling because "Alto" goes up to 9977 while "Bajo" max is 12)
              // Let's map min to max on a visual height scale of 0 to 200px
              const visualHeightScale = (val) => {
                // Logarithmic mapping for better visual representation of vastly different scales
                const minVal = 0.003;
                const maxVal = 9977.384;
                const logMin = Math.log10(minVal);
                const logMax = Math.log10(maxVal);
                const logVal = Math.log10(val);
                return ((logVal - logMin) / (logMax - logMin)) * 180 + 10;
              };

              const hMax = visualHeightScale(data.max);
              const hQ3 = visualHeightScale(data.q3);
              const hMedian = visualHeightScale(data.median);
              const hQ1 = visualHeightScale(data.q1);
              const hMin = visualHeightScale(data.min);

              return (
                <div 
                  key={data.category} 
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '20%', position: 'relative' }}
                  className="boxplot-container"
                >
                  {/* SVG representing the boxplot */}
                  <svg width="60" height="200" style={{ overflow: 'visible' }}>
                    {/* Background line (whisker vertical line) */}
                    <line x1="30" y1={200 - hMax} x2="30" y2={200 - hMin} stroke="var(--text-muted)" strokeWidth="1.5" />
                    
                    {/* Top whisker cap */}
                    <line x1="20" y1={200 - hMax} x2="40" y2={200 - hMax} stroke="var(--text-muted)" strokeWidth="1.5" />
                    
                    {/* Bottom whisker cap */}
                    <line x1="20" y1={200 - hMin} x2="40" y2={200 - hMin} stroke="var(--text-muted)" strokeWidth="1.5" />
                    
                    {/* IQR Box */}
                    <rect 
                      x="10" 
                      y={200 - hQ3} 
                      width="40" 
                      height={hQ3 - hQ1} 
                      fill="var(--primary-light)" 
                      stroke="var(--primary)" 
                      strokeWidth="2" 
                      rx="2"
                    />
                    
                    {/* Median Line */}
                    <line x1="10" y1={200 - hMedian} x2="50" y2={200 - hMedian} stroke="var(--secondary)" strokeWidth="2.5" />
                    
                    {/* Tooltip Overlay */}
                    <rect 
                      x="5" 
                      y={200 - hMax} 
                      width="50" 
                      height={hMax - hMin} 
                      fill="transparent" 
                      style={{ cursor: 'help' }}
                    >
                      <title>{`Nivel: ${data.category} (n=${data.category === 'Bajo' ? 488 : 487})\nMax: ${data.max.toFixed(2)} TWh\nQ3: ${data.q3.toFixed(2)} TWh\nMediana: ${data.median.toFixed(2)} TWh\nQ1: ${data.q1.toFixed(2)} TWh\nMin: ${data.min.toFixed(2)} TWh\nPromedio: ${data.mean.toFixed(2)} TWh`}</title>
                    </rect>
                  </svg>
                  
                  {/* Category label below chart */}
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '0.5rem', textAlign: 'center' }}>
                    {data.category}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    {data.category === 'Alto' ? '>538 TWh' : data.category === 'Medio-Alto' ? '72-538 TWh' : data.category === 'Medio-Bajo' ? '13-72 TWh' : '<13 TWh'}
                  </span>
                </div>
              );
            })}
          </div>

          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4, marginTop: '0.5rem' }}>
            * Gráfico en escala semilogarítmica para representar las diferencias extremas. En los datos del TP, los países con categoría <strong>Alto</strong> concentran la gran mayoría del suministro, y los <i>outliers</i> detectados corresponden a potencias como Arabia Saudita y Rusia, los cuales no fueron removidos por ser estratégicamente relevantes.
          </p>
        </div>
      </div>
    </div>
  );
}

export default InteractiveCharts;
