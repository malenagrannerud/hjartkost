import { Card } from "@/components/ui/card";
import fruitsIllustration from "@/assets/fruits-illustration.jpg";

const Today = () => {
  return (
    <div className="p-6 pb-24 space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-primary mb-2">Idag</h1>
        <p className="text-primary/70">Dina dagliga tips och mål</p>
      </header>

      <Card className="p-6 bg-gradient-to-br from-secondary/20 to-secondary/5 border-secondary/20">
        <h2 className="text-xl font-semibold mb-3 text-primary">Dagens fokus</h2>
        <p className="text-primary/80 mb-4">
          Kom ihåg att äta minst 5 portioner frukt och grönsaker idag! 🥗
        </p>
        <div className="rounded-xl overflow-hidden">
          <img 
            src={fruitsIllustration} 
            alt="Färska frukter och grönsaker" 
            className="w-full h-48 object-cover"
          />
        </div>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-primary">Dagens tips</h3>
        
        <Card className="p-5 hover:shadow-md transition-shadow">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💧</span>
            <div>
              <h4 className="font-semibold text-primary mb-1">Drick mer vatten</h4>
              <p className="text-sm text-primary/70">
                Sikta på minst 2 liter vatten under dagen
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-5 hover:shadow-md transition-shadow">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🚶‍♀️</span>
            <div>
              <h4 className="font-semibold text-primary mb-1">30 minuters promenad</h4>
              <p className="text-sm text-primary/70">
                En lugn promenad gör underverk för ditt hjärta
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-5 hover:shadow-md transition-shadow">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🧘</span>
            <div>
              <h4 className="font-semibold text-primary mb-1">Andningsövning</h4>
              <p className="text-sm text-primary/70">
                Ta 5 minuter för medveten andning och avslappning
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Today;