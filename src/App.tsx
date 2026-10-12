import React, { useState } from 'react';
import {
  Building2,
  Database,
  Layers,
  Send,
  Smartphone,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Globe,
  RefreshCw,
  Coins,
  Cpu,
  Clock,
  Sparkles,
  Users,
  Search,
  Check,
  ChevronRight,
  TrendingUp,
  FileSpreadsheet,
  Download,
  Calendar,
  PhoneCall,
  Flame,
  Award
} from 'lucide-react';

// Type definitions
type ActiveTab = 'arquitetura' | 'hoteleiro' | 'database' | 'propostas' | 'automacoes' | 'mercado_riscos' | 'roi';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('arquitetura');
  const [selectedProposta, setSelectedProposta] = useState<'custom' | 'hibrida'>('custom');

  // ROI Calculator states
  const [ticketMedio, setTicketMedio] = useState<number>(650);
  const [reservasMes, setReservasMes] = useState<number>(120);
  const [taxaOta, setTaxaOta] = useState<number>(18);
  const [conversaoDireta, setConversaoDireta] = useState<number>(15);

  // Automation Simulator state
  const [simulatedEvent, setSimulatedEvent] = useState<string>('booking_created');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationLog, setSimulationLog] = useState<string[]>([]);

  // Calculate ROI
  const faturamentoMensal = reservasMes * ticketMedio;
  const comissaoOtaAtual = faturamentoMensal * (taxaOta / 100);
  const reservasRecuperadas = Math.round(reservasMes * (conversaoDireta / 100));
  const economiaComissaoMes = reservasRecuperadas * ticketMedio * (taxaOta / 100);
  const economiaComissaoAno = economiaComissaoMes * 12;

  const triggerSimulation = (event: string) => {
    setSimulatedEvent(event);
    setIsSimulating(true);
    setSimulationLog([]);

    const steps: { [key: string]: string[] } = {
      booking_created: [
        '🔔 HQbeds dispara Webhook: "reservation.created" (ID: #HQ-94821)',
        '⚡ Servidor HospedaSync recebe e valida token HMAC de segurança',
        '🔍 Verificação no PostgreSQL: Cliente "Mariana Silva" existe? -> Sim (ID 14.820)',
        '📝 Criação do registro de estadia (Check-in: 20/Nov | Quarto: Suíte Luxo 04)',
        '📲 Disparo WhatsApp API (Template HSM "booking_confirm"): Envio de link de pré-checkin digital e voucher',
        '✅ Status 200 retornado ao HQbeds em 180ms.'
      ],
      pre_checkin: [
        '⏰ Cron Job diário detecta reservas com Check-in em D-1 (Amanhã)',
        '📋 Consulta no PostgreSQL: 8 hóspedes com entrada amanhã',
        '🗺️ Disparo WhatsApp: "Olá [Nome]! Amanhã é seu check-in. Segue localização Waze/Google Maps e regras da pousada."',
        '🔑 Envio de formulário de ficha cadastral digital (FNRH/Embratur)',
        '💬 Resposta automática se o cliente solicitar antecipação de horário.'
      ],
      post_checkout: [
        '🔔 HQbeds dispara Webhook: "reservation.status_changed -> CHECKED_OUT"',
        '⏳ Aguarda buffer de 2 horas (tempo do hóspede retornar da viagem)',
        '⭐ WhatsApp Disparo: "Olá! Como foi sua estadia? Avalie de 1 a 5 estrelas."',
        '🎁 Se nota 5: Redireciona para o Google Meu Negócio + Cupom 15% OFF para próxima reserva DIRETA (sem Booking/Airbnb)',
        '📊 Atualiza LTV (Lifetime Value) e histórico do hóspede no CRM.'
      ],
      birthday: [
        '🎂 Rotina diária das 09:00: Varredura de campo "data_nascimento" nos 28k clientes',
        '🎯 Identificados 78 aniversariantes do dia na base',
        '📱 Disparo segmentado: "Parabéns [Nome]! Para comemorar seu dia, você ganhou 20% de desconto no seu mês de aniversário!"',
        '📈 Taxa média de conversão direta em hotelaria para aniversariantes: 4.8%'
      ]
    };

    const targetSteps = steps[event] || [];
    targetSteps.forEach((step, idx) => {
      setTimeout(() => {
        setSimulationLog(prev => [...prev, step]);
        if (idx === targetSteps.length - 1) {
          setIsSimulating(false);
        }
      }, (idx + 1) * 350);
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-white tracking-tight">HospedaSync CRM</h1>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                  Parecer Arquitetural Sênior
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Integração HQbeds + WhatsApp + Gestão & Higienização de 28k Contatos
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
              Base: 28.000 clientes
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
              PMS: HQbeds
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-950 text-indigo-300 border border-indigo-800">
              Canal: WhatsApp
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-1 overflow-x-auto no-scrollbar border-t border-slate-800/60 pt-1">
          {[
            { id: 'arquitetura', label: '1. Arquitetura da Solução', icon: Cpu },
            { id: 'hoteleiro', label: '2. Negócio Hoteleiro & HQbeds', icon: Building2 },
            { id: 'database', label: '3. Banco de Dados & 28k Contatos', icon: Database },
            { id: 'propostas', label: '4. As Duas Propostas', icon: Layers },
            { id: 'automacoes', label: '5. Simulador de Automações', icon: Send },
            { id: 'mercado_riscos', label: '6. Riscos & Ferramentas', icon: ShieldAlert },
            { id: 'roi', label: '7. Calculadora de ROI', icon: Coins }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ActiveTab)}
                className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-medium rounded-t-lg transition-colors whitespace-nowrap border-b-2 ${
                  isActive
                    ? 'bg-slate-800/80 text-indigo-400 border-indigo-500'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border-transparent'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">

        {/* ==================== TAB 1: ARQUITETURA GERAL ==================== */}
        {activeTab === 'arquitetura' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
              <div className="max-w-3xl space-y-3 relative z-10">
                <span className="text-xs uppercase tracking-wider text-indigo-400 font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Diagnóstico do Especialista
                </span>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  Sim, é 100% possível e é um projeto com altíssimo retorno financeiro.
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Você está enfrentando um gargalo clássico de crescimento na hotelaria: a transição de uma operação
                  artesanal (contatos soltos em 2 contas do Google) para uma operação profissional integrada. Com 28.000 clientes,
                  você tem uma mina de ouro em mãos, mas atualmente está cego e dependente de intermediários.
                </p>
              </div>
            </div>

            {/* Visual Architecture Diagram */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-400" />
                Fluxo Arquitetural de Dados Ponta a Ponta
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
                {/* Stage 1 */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1">Passo 1</span>
                    <h4 className="font-semibold text-sm text-white mb-1">Canais de Venda (OTAs)</h4>
                    <p className="text-xs text-slate-400">Airbnb, Booking, Expedia e Motor de Reserva Direto.</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-900 flex flex-wrap gap-1">
                    <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">Reserva efetuada</span>
                  </div>
                </div>

                {/* Stage 2 */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block mb-1">Passo 2</span>
                    <h4 className="font-semibold text-sm text-white mb-1">PMS HQbeds</h4>
                    <p className="text-xs text-slate-400">Centraliza quartos, check-in, financeiro e emite Webhook.</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-900">
                    <span className="text-[10px] bg-blue-950 text-blue-400 px-2 py-0.5 rounded">Webhook REST / JSON</span>
                  </div>
                </div>

                {/* Stage 3 */}
                <div className="bg-indigo-950/40 border border-indigo-700/50 rounded-xl p-4 flex flex-col justify-between shadow-lg shadow-indigo-950/50">
                  <div>
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block mb-1">Passo 3 (Core)</span>
                    <h4 className="font-semibold text-sm text-white mb-1">HospedaSync CRM</h4>
                    <p className="text-xs text-slate-300">
                      Banco PostgreSQL próprio. Unifica os 28k hóspedes, calcula LTV, datas e regras.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-indigo-900/50">
                    <span className="text-[10px] bg-indigo-900 text-indigo-200 px-2 py-0.5 rounded font-mono">28.000 perfis</span>
                  </div>
                </div>

                {/* Stage 4 */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">Passo 4</span>
                    <h4 className="font-semibold text-sm text-white mb-1">Gateway WhatsApp</h4>
                    <p className="text-xs text-slate-400">Meta Cloud API Oficial ou Evolution API / Z-API.</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-900">
                    <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded">Disparo & Conversa</span>
                  </div>
                </div>

                {/* Stage 5 */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block mb-1">Passo 5</span>
                    <h4 className="font-semibold text-sm text-white mb-1">Hóspede Final</h4>
                    <p className="text-xs text-slate-400">Recebe confirmação, pré-checkin e promoções diretas.</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-900">
                    <span className="text-[10px] bg-purple-950 text-purple-300 px-2 py-0.5 rounded">Fidelização Direta</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200 block mb-1">Por que o Google Contacts estourou?</strong>
                  O Google Contacts impõe um limite estrito de <strong>25.000 contatos por conta Google</strong>. Ele não foi feito para CRM:
                  não possui chave estrangeira para estadias, não guarda histórico de consumo, não permite segmentação dinâmica por perfil de viagem
                  e não se conecta de forma limpa a APIs hoteleiras. A migração para um banco relacional é mandatória e urgente.
                </div>
              </div>
            </div>

            {/* Três Pilares da Solução */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
                <div className="w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                  <Database className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-base">Higienização e Base Única</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Exportar os contatos das duas contas Google (arquivos .VCF ou .CSV), limpar telefones (+55, DDD, 9º dígito),
                  padronizar datas de nascimento e carregar em banco relacional seguro com auditoria LGPD.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-base">Sincronia HQbeds via Webhook</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Quando uma reserva é criada, alterada ou cancelada no HQbeds, o CRM captura o evento em tempo real.
                  Se o cliente já existir na base, atualiza a estadia. Se for novo, adiciona automaticamente.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
                <div className="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                  <Smartphone className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-base">Automação de WhatsApp</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Gatilhos de envio programado: Boas-vindas, Pré-checkin digital em D-1, Pesquisa NPS em D+1 do checkout
                  e campanhas de aniversário com cupons de reserva direta economizando 15% a 20% das OTAs.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 2: NEGÓCIO HOTELEIRO & HQBEDS ==================== */}
        {activeTab === 'hoteleiro' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border border-slate-800 bg-slate-900 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-indigo-400" />
                Entendendo a Engenharia do Negócio Hoteleiro
              </h2>
              <p className="text-xs text-slate-400 mb-6">
                Para construir um software eficaz para seu cliente, você precisa dominar o vocabulário e os fluxos reais da hotelaria:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. OTAs */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">Tópico 1</span>
                    <span className="text-[10px] bg-amber-950 text-amber-400 px-2 py-0.5 rounded border border-amber-800/50">Online Travel Agencies</span>
                  </div>
                  <h3 className="text-base font-semibold text-white">Como funciona fazer viagens por aqui? (Booking, Airbnb, Expedia)</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    OTAs são intermediárias digitais com imenso tráfego. O hóspede busca, escolhe a acomodação e paga na plataforma.
                  </p>
                  <ul className="text-xs text-slate-400 space-y-2 list-disc pl-4">
                    <li><strong className="text-slate-200">Comissões pesadas:</strong> Cobram de <strong>15% a 22%</strong> de cada diária do seu cliente.</li>
                    <li><strong className="text-slate-200">Contenção de dados:</strong> O Airbnb e o Booking costumam mascarar os e-mails dos hóspedes (ex: <code className="text-indigo-300">guest-1234@guest.booking.com</code>). O telefone nem sempre vem completo.</li>
                    <li><strong className="text-slate-200">O segredo do CRM:</strong> O hotel precisa capturar o WhatsApp real no momento do Check-in físico para torná-lo um <em>cliente direto</em> na próxima viagem!</li>
                  </ul>
                </div>

                {/* 2. Channel Manager */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wide">Tópico 2</span>
                    <span className="text-[10px] bg-blue-950 text-blue-400 px-2 py-0.5 rounded border border-blue-800/50">Gerenciador de Canais</span>
                  </div>
                  <h3 className="text-base font-semibold text-white">O que é um Channel Manager?</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    É o <strong>middleware sincronizador</strong>. Imagine que o seu cliente tem apenas 10 quartos. Ele coloca esses 10 quartos no Booking, no Airbnb e na Expedia ao mesmo tempo.
                  </p>
                  <ul className="text-xs text-slate-400 space-y-2 list-disc pl-4">
                    <li><strong className="text-slate-200">Elimina o Overbooking:</strong> Quando o quarto 03 é reservado no Airbnb, o Channel Manager avisa o Booking e a Expedia em milissegundos para bloquearem aquele quarto.</li>
                    <li><strong className="text-slate-200">Paridade Tarifária:</strong> Se ele alterar a diária para R$ 400 no feriado, o Channel Manager replica a tarifa para todas as OTAs de uma vez só.</li>
                  </ul>
                </div>

                {/* 3. PMS & Financeiro */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">Tópico 3</span>
                    <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800/50">Property Management System</span>
                  </div>
                  <h3 className="text-base font-semibold text-white">O que é um PMS e suas movimentações financeiras?</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    O <strong>PMS</strong> é o ERP do hotel (o cérebro da recepção e governança).
                  </p>
                  <ul className="text-xs text-slate-400 space-y-2 list-disc pl-4">
                    <li><strong className="text-slate-200">Folio da Conta:</strong> Cada reserva tem uma conta aberta. Se o hóspede consome uma água de R$ 6 ou pede lavanderia, isso é lançado no folio.</li>
                    <li><strong className="text-slate-200">Gestão de Pagamentos:</strong> Registra depósitos de 50%, adiantamentos via PIX, caução de cartão de crédito e faturamento corporativo com faturas/NFS-e.</li>
                    <li><strong className="text-slate-200">Governança:</strong> Status do quarto (Limpo, Sujo, Em Manutenção, Ocupado).</li>
                  </ul>
                </div>

                {/* 4. HQbeds */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-400 uppercase tracking-wide">Tópico 4</span>
                    <span className="text-[10px] bg-purple-950 text-purple-300 px-2 py-0.5 rounded border border-purple-800/50">HQbeds Plataforma</span>
                  </div>
                  <h3 className="text-base font-semibold text-white">Como funciona a Plataforma de Gestão HQbeds?</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    O <strong>HQbeds</strong> é uma das ferramentas mais populares no Brasil e América Latina para hostels, pousadas e pequenos hotéis.
                  </p>
                  <ul className="text-xs text-slate-400 space-y-2 list-disc pl-4">
                    <li><strong className="text-slate-200">Tudo em um:</strong> Ele é PMS + Motor de Reservas Direto + Channel Manager integrado.</li>
                    <li><strong className="text-slate-200">Capacidade de Integração:</strong> Possui <strong>API REST</strong> e sistema de <strong>Webhooks</strong> para avisar sistemas externos sobre novos hóspedes, check-in e check-out.</li>
                    <li><strong className="text-slate-200">Oportunidade:</strong> O HQbeds cuida bem da recepção, mas é fraco em <em>CRM relacional</em> e <em>automações ativas de WhatsApp</em>. É exatamente onde o seu software entra!</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 3: BANCO DE DADOS & 28K CONTATOS ==================== */}
        {activeTab === 'database' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Database className="w-5 h-5 text-indigo-400" />
                    Qual base de dados é indicada para 28 mil clientes?
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Análise técnica sênior de volumetria, consumo de hardware e opções Nuvem vs Local.
                  </p>
                </div>
                <div className="text-right hidden sm:block">
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-3 py-1 rounded-full">
                    28k linhas ≈ 15 a 35 MB de dados
                  </span>
                </div>
              </div>

              {/* Clarification on 28k rows */}
              <div className="bg-indigo-950/30 border border-indigo-800/40 rounded-xl p-4 mb-6 text-xs text-slate-300 leading-relaxed">
                <p className="font-semibold text-indigo-300 mb-1">
                  💡 Visão de Engenharia de Dados:
                </p>
                Para um desenvolvedor sênior, <strong>28.000 registros</strong> é considerado um volume <strong>extremamente leve</strong>.
                Qualquer banco relacional moderno processa consultas indexadas em 28k linhas em menos de <strong>3 milissegundos</strong>.
                Portanto, a escolha não é sobre &quot;aguentar o peso&quot;, mas sim sobre <strong>integridade referencial, segurança LGPD, backups automáticos e facilidade de sincronia via APIs</strong>.
              </div>

              {/* Cloud vs Local Table */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Nuvem */}
                <div className="bg-slate-950 border border-indigo-500/30 rounded-xl p-5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-indigo-600 text-[10px] font-bold text-white uppercase px-3 py-0.5 rounded-bl-lg">
                    Recomendado (Nuvem)
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Globe className="w-5 h-5 text-indigo-400" />
                    <h3 className="text-base font-bold text-white">Opção 1: PostgreSQL em Nuvem</h3>
                  </div>
                  <p className="text-xs text-slate-400 mb-4">
                    Hospedado em instâncias gerenciadas (ex: <strong>Supabase</strong>, <strong>Neon Serverless</strong>, <strong>AWS RDS</strong> ou <strong>Google Cloud SQL</strong>).
                  </p>

                  <div className="space-y-3 text-xs">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-200">Disponibilidade 24/7 para Webhooks:</strong> O HQbeds precisa disparar eventos quando a pousada estiver fechada à noite. O banco local cairia se a luz da pousada faltasse.
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-200">Backups Automáticos & PITR:</strong> Proteção total contra perda de dados ou invasão de ransomware no computador da recepção.
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-200">Custo Praticamente Nulo:</strong> Para 28k registros e menos de 100MB, o free tier ou plano básico de $5/mês atende com sobras.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Local */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Cpu className="w-5 h-5 text-slate-400" />
                    <h3 className="text-base font-bold text-white">Opção 2: Banco de Dados Local</h3>
                  </div>
                  <p className="text-xs text-slate-400 mb-4">
                    Instalado em um mini-servidor na própria pousada (ex: PostgreSQL rodando em Docker ou SQLite em máquina Windows/Linux da recepção).
                  </p>

                  <div className="space-y-3 text-xs">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-200">Vantagem:</strong> Funciona mesmo se a internet da pousada oscilar durante o atendimento presencial na recepção.
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-200">Grave Desvantagem para Webhooks:</strong> Para o HQbeds e o WhatsApp enviarem eventos ao servidor local, seria necessário IP Fixo ou túneis reversos (Cloudflare Tunnels/ngrok), suscetíveis a quedas de luz.
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-200">Risco Físico:</strong> Se o computador da recepção queimar ou for roubado, a base de 28k clientes se perde se o backup falhar.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Database Schema Design */}
              <div className="mt-6 p-5 bg-slate-950 border border-slate-800 rounded-xl">
                <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-indigo-400" />
                  Modelagem Relacional Recomendada (PostgreSQL)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <div className="text-indigo-400 font-bold mb-2 pb-1 border-b border-slate-800">TABLE hospedes</div>
                    <div className="text-slate-300 space-y-1 text-[11px]">
                      <div>id (UUID, PK)</div>
                      <div>nome_completo (VARCHAR)</div>
                      <div>telefone_e164 (VARCHAR, INDEX)</div>
                      <div>email (VARCHAR)</div>
                      <div>data_nascimento (DATE, INDEX)</div>
                      <div>cidade / estado (VARCHAR)</div>
                      <div>ltv_total (DECIMAL)</div>
                      <div>optin_whatsapp (BOOLEAN)</div>
                      <div>created_at (TIMESTAMP)</div>
                    </div>
                  </div>

                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <div className="text-blue-400 font-bold mb-2 pb-1 border-b border-slate-800">TABLE reservas</div>
                    <div className="text-slate-300 space-y-1 text-[11px]">
                      <div>id (UUID, PK)</div>
                      <div>hospede_id (FK hospedes)</div>
                      <div>hqbeds_reserva_id (VARCHAR, UNIQUE)</div>
                      <div>origem_canal (Booking, Airbnb, Direto)</div>
                      <div>checkin_previsto (DATE)</div>
                      <div>checkout_previsto (DATE)</div>
                      <div>valor_total (DECIMAL)</div>
                      <div>status (CONFIRMADO, CHECKOUT)</div>
                    </div>
                  </div>

                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <div className="text-emerald-400 font-bold mb-2 pb-1 border-b border-slate-800">TABLE whatsapp_logs</div>
                    <div className="text-slate-300 space-y-1 text-[11px]">
                      <div>id (UUID, PK)</div>
                      <div>hospede_id (FK)</div>
                      <div>reserva_id (FK)</div>
                      <div>tipo (PRE_CHECKIN, POS_CHECKOUT, NIVER)</div>
                      <div>mensagem_template (VARCHAR)</div>
                      <div>status_envio (SENT, DELIVERED, READ)</div>
                      <div>respostas_recebidas (JSONB)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 4: AS DUAS PROPOSTAS VIÁVEIS ==================== */}
        {activeTab === 'propostas' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Layers className="w-5 h-5 text-indigo-400" />
                    Duas Propostas Viáveis para o seu Cliente
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Compare abordagem sob medida (propriedade do hotel) versus composição com softwares de mercado.
                  </p>
                </div>
                <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                  <button
                    onClick={() => setSelectedProposta('custom')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                      selectedProposta === 'custom'
                        ? 'bg-indigo-600 text-white shadow'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Proposta A: Sob Medida (Recomendada)
                  </button>
                  <button
                    onClick={() => setSelectedProposta('hibrida')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                      selectedProposta === 'hibrida'
                        ? 'bg-indigo-600 text-white shadow'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Proposta B: Solução Híbrida Low-Code
                  </button>
                </div>
              </div>

              {selectedProposta === 'custom' ? (
                /* PROPOSTA A: CUSTOM */
                <div className="space-y-6">
                  <div className="border border-indigo-500/40 bg-indigo-950/20 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                        Proposta A: Arquitetura Própria HospedaSync CRM
                      </span>
                      <span className="text-xs bg-emerald-950 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-800 font-semibold">
                        Maior Margem e Valor para o Hotel
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      Sistema Web Próprio (React + Node.js/NestJS + PostgreSQL + WhatsApp API)
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Você desenvolve um CRM hoteleiro exclusivo. Ele roda na nuvem, recebe os Webhooks do HQbeds, possui uma tela web moderna
                      para os recepcionistas buscarem hóspedes rapidamente pelo número de telefone e dispara automações programadas.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        Vantagens Competitivas
                      </h4>
                      <ul className="text-xs text-slate-400 space-y-2">
                        <li>• <strong>Sem custo de licença por contato:</strong> Ferramentas como RD Station e HubSpot cobram fortunas para bases de 28k contatos (mais de R$ 2.000 a R$ 4.000/mês só de licença!).</li>
                        <li>• <strong>100% customizado para a rotina da recepção:</strong> Sem campos inúteis de B2B corporativo. Focado em quarto, diária, acompanhantes e check-in.</li>
                        <li>• <strong>Ativo do Hotel:</strong> O software vira propriedade do cliente ou seu (caso você queira vender como SaaS para outras pousadas que usam HQbeds!).</li>
                      </ul>
                    </div>

                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-indigo-400" />
                        Stack Tecnológica Recomendada
                      </h4>
                      <div className="text-xs text-slate-300 space-y-1.5">
                        <div className="flex justify-between py-1 border-b border-slate-800">
                          <span className="text-slate-400">Frontend:</span>
                          <span className="font-semibold text-white">React / Next.js com Tailwind CSS</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-800">
                          <span className="text-slate-400">Backend:</span>
                          <span className="font-semibold text-white">Node.js / TypeScript (NestJS ou Fastify)</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-800">
                          <span className="text-slate-400">Banco de Dados:</span>
                          <span className="font-semibold text-white">PostgreSQL (Supabase ou Neon)</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-800">
                          <span className="text-slate-400">Fila / Jobs:</span>
                          <span className="font-semibold text-white">Redis + BullMQ (para agendamento de mensagens)</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-800">
                          <span className="text-slate-400">WhatsApp:</span>
                          <span className="font-semibold text-white">Meta Cloud API Oficial ou Evolution API</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-slate-400">Prazo Estimado de MVP:</span>
                      <strong className="text-white ml-1">4 a 6 semanas</strong>
                    </div>
                    <div>
                      <span className="text-slate-400">Custo de Infraestrutura Mensal:</span>
                      <strong className="text-emerald-400 ml-1">~R$ 150 a R$ 350 / mês</strong>
                    </div>
                  </div>
                </div>
              ) : (
                /* PROPOSTA B: HIBRIDA */
                <div className="space-y-6">
                  <div className="border border-blue-500/40 bg-blue-950/20 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                        Proposta B: Solução Híbrida com Ferramentas Integradas
                      </span>
                      <span className="text-xs bg-blue-950 text-blue-400 px-2.5 py-1 rounded-full border border-blue-800 font-semibold">
                        Menor Prazo de Lançamento
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      Chatwoot (Atendimento) + n8n (Automações) + Banco PostgreSQL
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Em vez de programar uma interface de chat e tela de atendimento do zero, você sobe o <strong>Chatwoot</strong> (open-source de multi-atendimento WhatsApp)
                      e usa o <strong>n8n</strong> como orquestrador de eventos entre o HQbeds e o WhatsApp.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        Vantagens da Proposta B
                      </h4>
                      <ul className="text-xs text-slate-400 space-y-2">
                        <li>• <strong>Velocidade de Entrega:</strong> Entra em funcionamento em 1 a 2 semanas.</li>
                        <li>• <strong>Interface Pronta com App Mobile:</strong> Os recepcionistas usam o app oficial do Chatwoot no celular para responder aos clientes.</li>
                        <li>• <strong>Multi-atendentes:</strong> Vários funcionários usando o mesmo número de WhatsApp sem deslogar um ao outro.</li>
                      </ul>
                    </div>

                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-400" />
                        Limitações e Trade-offs
                      </h4>
                      <ul className="text-xs text-slate-400 space-y-2">
                        <li>• O Chatwoot não tem campos nativos de hotelaria (ex: &quot;quarto reservado&quot;, &quot;data de check-in&quot;), exigindo criar atributos customizados manuais.</li>
                        <li>• O cálculo de métricas de hospitalidade (LTV do hóspede, histórico de estadias repetidas) fica mais complexo no n8n.</li>
                        <li>• Dependência de múltiplos serviços de terceiros rodando simultaneamente.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-slate-400">Prazo Estimado de Implantação:</span>
                      <strong className="text-white ml-1">2 a 3 semanas</strong>
                    </div>
                    <div>
                      <span className="text-slate-400">Custo de Servidor VPS (Hetzner / DigitalOcean):</span>
                      <strong className="text-emerald-400 ml-1">~R$ 180 a R$ 280 / mês</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================== TAB 5: SIMULADOR DE AUTOMAÇÕES ==================== */}
        {activeTab === 'automacoes' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Send className="w-5 h-5 text-indigo-400" />
                    Simulador Interativo de Gatilhos HQbeds & WhatsApp
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Teste o comportamento do pipeline em tempo real quando eventos acontecem no hotel.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {[
                  { id: 'booking_created', label: 'Nova Reserva (Webhook)', desc: 'Gatilho instantâneo', icon: Sparkles },
                  { id: 'pre_checkin', label: 'Pré-Checkin D-1', desc: 'Gatilho programado', icon: Calendar },
                  { id: 'post_checkout', label: 'Pós Check-out (NPS)', desc: 'Conversão para Direto', icon: Award },
                  { id: 'birthday', label: 'Aniversário 28k', desc: 'Campanha de Reativação', icon: Flame }
                ].map(item => {
                  const Icon = item.icon;
                  const isSelected = simulatedEvent === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => triggerSimulation(item.id)}
                      disabled={isSimulating}
                      className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-indigo-500 bg-indigo-950/50 shadow-md'
                          : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                      } ${isSimulating ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-indigo-400' : 'text-slate-400'}`} />
                        <span className="text-[10px] text-slate-500">Testar</span>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">{item.label}</div>
                        <div className="text-[10px] text-slate-400">{item.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Execution Console & WhatsApp Preview */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Console Log */}
                <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                      Pipeline Execution Log
                    </span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
                      {isSimulating ? 'Executando...' : 'Aguardando Disparo'}
                    </span>
                  </div>

                  <div className="space-y-2 min-h-[220px] text-xs">
                    {simulationLog.length === 0 ? (
                      <div className="text-slate-500 italic py-8 text-center">
                        Clique em um dos botões acima para disparar a simulação do webhook.
                      </div>
                    ) : (
                      simulationLog.map((log, i) => (
                        <div key={i} className="text-slate-300 leading-relaxed animate-fadeIn">
                          {log}
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* WhatsApp Message Preview */}
                <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                  <div className="text-xs font-semibold text-slate-300 mb-3 flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-emerald-400" />
                    Preview no WhatsApp do Hóspede
                  </div>

                  <div className="bg-[#0b141a] rounded-xl p-4 border border-emerald-900/30 flex-1 flex flex-col justify-center">
                    <div className="bg-[#202c33] text-slate-100 p-3.5 rounded-lg text-xs space-y-2 shadow relative">
                      <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Pousada Recanto dos Sonhos</div>

                      {simulatedEvent === 'booking_created' && (
                        <div>
                          Olá <strong>Mariana</strong>! 🎉 Sua reserva foi confirmada com sucesso!
                          <div className="mt-2 text-slate-300">
                            📅 <strong>Check-in:</strong> 20 de Novembro às 14h<br />
                            🛏️ <strong>Acomodação:</strong> Suíte Luxo 04
                          </div>
                          <div className="mt-3 pt-2 border-t border-slate-700/60 text-indigo-300">
                            👉 Toque aqui para agilizar seu Check-in Digital antes da chegada: <span className="underline">pousada.com.br/checkin/94821</span>
                          </div>
                        </div>
                      )}

                      {simulatedEvent === 'pre_checkin' && (
                        <div>
                          Oi <strong>Mariana</strong>! Amanhã é o grande dia! 🏖️
                          <div className="mt-2 text-slate-300">
                            Estamos preparando seu quarto com carinho. Segue a rota no Waze e senha do portão eletrônico:
                          </div>
                          <div className="mt-2 text-indigo-300 underline">
                            📍 waze.com/ul/h6g83b
                          </div>
                          <div className="mt-2 text-[11px] text-slate-400">
                            Horário do café: 07:30 às 10:00. Precisa de early check-in? Responda a esta mensagem!
                          </div>
                        </div>
                      )}

                      {simulatedEvent === 'post_checkout' && (
                        <div>
                          Mariana, esperamos que sua volta para casa tenha sido tranquila! ✨
                          <div className="mt-2 text-slate-300">
                            Como foi sua experiência conosco? Sua opinião nos ajuda a melhorar:
                          </div>
                          <div className="mt-2 flex gap-1 text-amber-400 font-bold">
                            ⭐⭐⭐⭐⭐
                          </div>
                          <div className="mt-2 text-[11px] text-emerald-300 bg-emerald-950/40 p-2 rounded border border-emerald-800/40">
                            🎁 Como agradecimento, use o cupom <strong>VOLTESEMPRE15</strong> na sua próxima reserva DIRETA em nosso WhatsApp e ganhe 15% de desconto (sem taxas de sites terceiros!).
                          </div>
                        </div>
                      )}

                      {simulatedEvent === 'birthday' && (
                        <div>
                          🎂 Parabéns pelo seu aniversário, <strong>Mariana</strong>!
                          <div className="mt-2 text-slate-300">
                            A equipe da Pousada preparou um presente especial para celebrar o seu dia:
                          </div>
                          <div className="mt-2 text-[11px] text-purple-300 bg-purple-950/40 p-2 rounded border border-purple-800/40">
                            🎈 <strong>20% OFF</strong> para você e seu acompanhante em qualquer final de semana deste mês!
                          </div>
                          <div className="mt-2 text-[11px] text-slate-400">
                            Basta responder esta mensagem para garantir suas datas.
                          </div>
                        </div>
                      )}

                      <div className="text-[9px] text-right text-slate-400 pt-1">
                        10:42 • Enviado com sucesso
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 6: RISCOS, DIFICULDADES E MERCADO ==================== */}
        {activeTab === 'mercado_riscos' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-400" />
                Dificuldades Reais, Riscos e Ferramentas de Mercado
              </h2>
              <p className="text-xs text-slate-400 mb-6">
                Como sênior, é fundamental antecipar armadilhas operacionais para o seu cliente não queimar dinheiro ou ser banido pelo WhatsApp.
              </p>

              {/* 3 Principais Riscos */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                <div className="bg-slate-950 border border-rose-900/40 rounded-xl p-5 space-y-3">
                  <div className="text-xs font-bold text-rose-400 uppercase tracking-wide flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" /> Risco Crítico 1
                  </div>
                  <h3 className="text-sm font-bold text-white">Bloqueio de Chip no WhatsApp</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Se você disparar mensagens em massa para os 28.000 clientes de uma vez usando bibliotecas piratas (Baileys, Z-API não oficial ou WhatsApp Web automatizado), <strong>o chip do hotel será banido em poucas horas</strong> por spam.
                  </p>
                  <div className="text-[11px] text-rose-300 bg-rose-950/30 p-2.5 rounded border border-rose-900/50">
                    <strong>Solução Arquitetural:</strong> Usar a <strong>Meta Cloud API Oficial</strong> com modelos pré-aprovados (Templates HSM) ou aquecer o número em lotes graduais de 100 a 200 mensagens/dia para clientes que interagiram nos últimos 12 meses.
                  </div>
                </div>

                <div className="bg-slate-950 border border-amber-900/40 rounded-xl p-5 space-y-3">
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wide flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" /> Risco Crítico 2
                  </div>
                  <h3 className="text-sm font-bold text-white">Higienização dos 28k Contatos</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Contatos do Google costumam ter números sem DDD, números sem o nono dígito (9XXXX-XXXX), telefones fixos misturados com celulares e nomes duplicados em contas diferentes.
                  </p>
                  <div className="text-[11px] text-amber-300 bg-amber-950/30 p-2.5 rounded border border-amber-900/50">
                    <strong>Solução Arquitetural:</strong> Script em Node/Python na importação que aplica Regex E.164 (+55), remove duplicados por chave única de telefone e valida números com HLR lookup antes de disparar.
                  </div>
                </div>

                <div className="bg-slate-950 border border-indigo-900/40 rounded-xl p-5 space-y-3">
                  <div className="text-xs font-bold text-indigo-400 uppercase tracking-wide flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" /> Risco Crítico 3
                  </div>
                  <h3 className="text-sm font-bold text-white">Regra da Janela de 24 Horas da Meta</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    No WhatsApp Oficial da Meta, quando o cliente manda mensagem, você tem 24h para responder livremente. Após 24h, só pode enviar mensagens usando <strong>Templates Pagos</strong> de utilidade ou marketing.
                  </p>
                  <div className="text-[11px] text-indigo-300 bg-indigo-950/30 p-2.5 rounded border border-indigo-900/50">
                    <strong>Solução Arquitetural:</strong> O CRM deve orientar o time: as mensagens automáticas de check-in devem ser templates de utilidade (~$0,008 por envio, centavos de real), que são baratas e aprovadas pela Meta.
                  </div>
                </div>
              </div>

              {/* Ferramentas de Mercado Existentes */}
              <div className="border-t border-slate-800 pt-6">
                <h3 className="text-base font-bold text-white mb-4">
                  Ferramentas Existentes no Mercado que atendem a Hotelaria
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white text-sm">Asksuite</span>
                      <span className="text-[10px] bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded">Especializada</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Plataforma de IA e atendimento hoteleiro omnichannel mais famosa do Brasil.
                    </p>
                    <div className="text-[11px] text-slate-300 pt-2 border-t border-slate-900">
                      <span className="text-amber-400 font-semibold">Ponto fraco:</span> Mensalidade alta (geralmente R$ 800 a R$ 2.000+/mês), focada em grandes redes.
                    </div>
                  </div>

                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white text-sm">Kommo (antigo amoCRM)</span>
                      <span className="text-[10px] bg-blue-950 text-blue-300 px-2 py-0.5 rounded">CRM Mensageiro</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Excelente CRM com foco em WhatsApp e funis visuais Kanban.
                    </p>
                    <div className="text-[11px] text-slate-300 pt-2 border-t border-slate-900">
                      <span className="text-amber-400 font-semibold">Ponto fraco:</span> Cobrança por usuário em dólar e não possui lógica nativa de quartos/checkin sem customização via n8n.
                    </div>
                  </div>

                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white text-sm">Chatwoot</span>
                      <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded">Open Source</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Plataforma de multi-atendimento aberta que pode ser hospedada em VPS próprio sem pagar por atendente.
                    </p>
                    <div className="text-[11px] text-slate-300 pt-2 border-t border-slate-900">
                      <span className="text-emerald-400 font-semibold">Ponto forte:</span> Excelente base para a Proposta B se o cliente quiser gastar pouco.
                    </div>
                  </div>

                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white text-sm">RD Station CRM / HubSpot</span>
                      <span className="text-[10px] bg-purple-950 text-purple-300 px-2 py-0.5 rounded">CRMs Tradicionais</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Famosos no mercado corporativo B2B e vendas consultivas.
                    </p>
                    <div className="text-[11px] text-slate-300 pt-2 border-t border-slate-900">
                      <span className="text-rose-400 font-semibold">Inviável aqui:</span> O modelo de cobrança por volume de contatos torna proibitivo carregar 28.000 hóspedes.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 7: CALCULADORA DE ROI ==================== */}
        {activeTab === 'roi' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Coins className="w-5 h-5 text-emerald-400" />
                    Calculadora de Retorno Sobre o Investimento (ROI) para o Cliente
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Use estes números exatos para justificar a contratação do seu desenvolvimento.
                  </p>
                </div>
              </div>

              {/* Calculator Controls */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <label className="text-xs text-slate-400 block mb-1">Ticket Médio por Estadia (R$)</label>
                  <input
                    type="number"
                    value={ticketMedio}
                    onChange={e => setTicketMedio(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-indigo-500 focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">Ex: 2 diárias de R$ 325</span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <label className="text-xs text-slate-400 block mb-1">Total de Reservas / Mês</label>
                  <input
                    type="number"
                    value={reservasMes}
                    onChange={e => setReservasMes(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-indigo-500 focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">Média de ocupação</span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <label className="text-xs text-slate-400 block mb-1">Comissão das OTAs (%)</label>
                  <input
                    type="number"
                    value={taxaOta}
                    onChange={e => setTaxaOta(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-indigo-500 focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">Booking/Airbnb costumam ser 18%</span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <label className="text-xs text-slate-400 block mb-1">Migração para Reserva Direta (%)</label>
                  <input
                    type="number"
                    value={conversaoDireta}
                    onChange={e => setConversaoDireta(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-indigo-500 focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">% da base de 28k reativada</span>
                </div>
              </div>

              {/* Metric Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">
                  <span className="text-xs text-slate-400 block mb-1">Dinheiro Perdido com OTAs Hoje</span>
                  <div className="text-2xl font-black text-rose-400 font-mono">
                    R$ {comissaoOtaAtual.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    <span className="text-xs text-slate-500 font-normal"> / mês</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2">
                    Comissão paga diretamente para Booking, Expedia e Airbnb que sai do bolso da pousada.
                  </p>
                </div>

                <div className="bg-slate-950 border border-emerald-900/50 rounded-xl p-5 bg-gradient-to-br from-emerald-950/20 to-slate-950">
                  <span className="text-xs text-emerald-400 font-semibold block mb-1">Economia Mensal com o CRM</span>
                  <div className="text-2xl font-black text-emerald-400 font-mono">
                    R$ {economiaComissaoMes.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    <span className="text-xs text-slate-500 font-normal"> / mês</span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-2">
                    {reservasRecuperadas} hóspedes fidelizados que passam a fechar direto pelo WhatsApp sem intermediários.
                  </p>
                </div>

                <div className="bg-slate-950 border border-indigo-900/50 rounded-xl p-5 bg-gradient-to-br from-indigo-950/20 to-slate-950">
                  <span className="text-xs text-indigo-400 font-semibold block mb-1">Lucro Extra Anual Retido</span>
                  <div className="text-2xl font-black text-indigo-300 font-mono">
                    R$ {economiaComissaoAno.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    <span className="text-xs text-slate-500 font-normal"> / ano</span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-2">
                    O projeto do CRM se paga integralmente em menos de <strong>30 a 60 dias</strong> de operação.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/40 text-slate-500 text-xs py-4 px-6 text-center">
        HospedaSync CRM • Relatório de Arquitetura de Software & Consultoria Hoteleira Sênior • Base de 28.000 clientes
      </footer>
    </div>
  );
}
