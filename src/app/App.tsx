import { useState } from 'react';
import { Wallet, TrendingUp, TrendingDown, Send, Calculator } from 'lucide-react';
import { format } from 'date-fns';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  date: Date;
  description: string;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! Sou o HelpBot, seu assistente financeiro pessoal. Como posso ajudá-lo hoje?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [savingsAmount, setSavingsAmount] = useState('');
  const [savingsMonths, setSavingsMonths] = useState('12');

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const parseMessage = (text: string) => {
    const lowerText = text.toLowerCase();

    // Parse expense patterns
    const expensePatterns = [
      /(?:gastei|despesa|paguei|comprei)\s*r?\$?\s*(\d+(?:[.,]\d{2})?)\s+(?:em|com|de|para|on)\s+(.+)/i,
      /r?\$?\s*(\d+(?:[.,]\d{2})?)\s+(?:em|com|de|para|on)\s+(.+)/i,
    ];

    // Parse income patterns
    const incomePatterns = [
      /(?:recebi|ganhei|renda|salário)\s*r?\$?\s*(\d+(?:[.,]\d{2})?)\s+(?:de|em|com)?\s*(.+)?/i,
      /(?:recebi|ganhei)\s*r?\$?\s*(\d+(?:[.,]\d{2})?)/i,
    ];

    // Check for expense
    for (const pattern of expensePatterns) {
      const match = text.match(pattern);
      if (match) {
        const amount = parseFloat(match[1].replace(',', '.'));
        const category = match[2].trim();
        return { type: 'expense' as const, amount, category };
      }
    }

    // Check for income
    for (const pattern of incomePatterns) {
      const match = text.match(pattern);
      if (match) {
        const amount = parseFloat(match[1].replace(',', '.'));
        const category = match[2]?.trim() || 'renda';
        return { type: 'income' as const, amount, category };
      }
    }

    return null;
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    // Parse and process
    const parsed = parseMessage(inputText);
    let botResponse = '';

    if (parsed) {
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        type: parsed.type,
        amount: parsed.amount,
        category: parsed.category,
        date: new Date(),
        description: inputText
      };
      setTransactions(prev => [...prev, newTransaction]);

      if (parsed.type === 'expense') {
        botResponse = `Entendido. Registrei uma despesa de R$${parsed.amount.toFixed(2)} em ${parsed.category}.`;
      } else {
        botResponse = `Perfeito! Registrei uma receita de R$${parsed.amount.toFixed(2)} de ${parsed.category}.`;
      }
    } else if (inputText.toLowerCase().includes('quanto') && inputText.toLowerCase().includes('gastei')) {
      if (transactions.length === 0) {
        botResponse = 'Você ainda não registrou nenhuma despesa. Comece registrando seus gastos!';
      } else {
        botResponse = `Com base nos seus dados, você gastou R$${totalExpenses.toFixed(2)} no total.`;
      }
    } else if (inputText.toLowerCase().includes('quanto') && inputText.toLowerCase().includes('tenho')) {
      botResponse = `Seu saldo atual é de R$${balance.toFixed(2)}. Você tem R$${totalIncome.toFixed(2)} em receitas e R$${totalExpenses.toFixed(2)} em despesas.`;
    } else {
      botResponse = 'Desculpe, não entendi. Você pode me dizer quanto gastou ou recebeu. Por exemplo: "Gastei R$50 em alimentação" ou "Recebi R$3000 de salário".';
    }

    // Add bot response
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: botResponse,
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, botMessage]);
    setInputText('');
  };

  const calculateSavings = () => {
    const amount = parseFloat(savingsAmount);
    const months = parseInt(savingsMonths);
    if (isNaN(amount) || isNaN(months)) return null;
    return amount * months;
  };

  const savingsResult = calculateSavings();

  return (
    <div className="size-full bg-neutral-50 overflow-auto">
      <div className="max-w-7xl mx-auto p-6 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-neutral-900 mb-2">HelpBot</h1>
          <p className="text-neutral-600">Seu assistente financeiro pessoal</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 border border-neutral-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-emerald-50 text-emerald-600">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-neutral-600">Receitas</span>
            </div>
            <div className="text-4xl text-neutral-900">
              R${totalIncome.toFixed(2)}
            </div>
          </div>

          <div className="bg-white p-6 border border-neutral-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-rose-50 text-rose-600">
                <TrendingDown className="w-5 h-5" />
              </div>
              <span className="text-neutral-600">Despesas</span>
            </div>
            <div className="text-4xl text-neutral-900">
              R${totalExpenses.toFixed(2)}
            </div>
          </div>

          <div className="bg-white p-6 border border-neutral-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-50 text-blue-600">
                <Wallet className="w-5 h-5" />
              </div>
              <span className="text-neutral-600">Saldo</span>
            </div>
            <div className={`text-4xl ${balance >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
              R${balance.toFixed(2)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Interface */}
          <div className="lg:col-span-2 bg-white border border-neutral-200 flex flex-col h-[600px]">
            <div className="p-4 border-b border-neutral-200">
              <h2 className="text-neutral-900">Conversação</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-neutral-100 text-neutral-900'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className={`text-xs mt-1 block ${
                      msg.sender === 'user' ? 'text-blue-100' : 'text-neutral-500'
                    }`}>
                      {format(msg.timestamp, 'HH:mm')}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-neutral-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 px-4 py-2 border border-neutral-300 focus:outline-none focus:border-blue-600"
                />
                <button
                  onClick={handleSend}
                  className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Enviar
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Savings Calculator */}
            <div className="bg-white border border-neutral-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Calculator className="w-5 h-5 text-blue-600" />
                <h2 className="text-neutral-900">Simulador de Poupança</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-neutral-600 mb-2">
                    Valor mensal (R$)
                  </label>
                  <input
                    type="number"
                    value={savingsAmount}
                    onChange={(e) => setSavingsAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-4 py-2 border border-neutral-300 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-neutral-600 mb-2">
                    Período (meses)
                  </label>
                  <input
                    type="number"
                    value={savingsMonths}
                    onChange={(e) => setSavingsMonths(e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 focus:outline-none focus:border-blue-600"
                  />
                </div>

                {savingsResult !== null && (
                  <div className="pt-4 border-t border-neutral-200">
                    <p className="text-neutral-600 mb-2">Total após {savingsMonths} meses:</p>
                    <p className="text-3xl text-emerald-600">
                      R${savingsResult.toFixed(2)}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white border border-neutral-200 p-6">
              <h2 className="text-neutral-900 mb-4">Transações Recentes</h2>

              {transactions.length === 0 ? (
                <p className="text-neutral-500">Nenhuma transação registrada ainda.</p>
              ) : (
                <div className="space-y-3">
                  {transactions.slice(-5).reverse().map(transaction => (
                    <div key={transaction.id} className="pb-3 border-b border-neutral-100 last:border-0">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-neutral-900">{transaction.category}</span>
                        <span className={transaction.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}>
                          {transaction.type === 'income' ? '+' : '-'}R${transaction.amount.toFixed(2)}
                        </span>
                      </div>
                      <span className="text-xs text-neutral-500">
                        {format(transaction.date, 'dd/MM/yyyy HH:mm')}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
