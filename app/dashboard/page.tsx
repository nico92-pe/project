'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { useQRCode } from '@/hooks/use-qr-code';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Image, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [inputUrl, setInputUrl] = useState('');
  const { 
    qrCodeUrl, 
    isGenerating, 
    error, 
    generateQRCode, 
    downloadQRCode 
  } = useQRCode();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateQRCode(inputUrl);
  };

  const handleDownload = (format: 'png' | 'jpeg') => {
    downloadQRCode(format);
    toast({
      title: "Download started",
      description: `Your QR code is downloading as a ${format.toUpperCase()} file.`,
      duration: 3000,
    });
  };

  if (loading) {
    return (
      <div className="container flex justify-center items-center min-h-[calc(100vh-16rem)]">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-2 text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">QR Code Generator</h1>
          <p className="text-muted-foreground">
            Enter any URL to generate a QR code and download it in your preferred format
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Create New QR Code</CardTitle>
            <CardDescription>
              Enter the URL you want to convert into a QR code
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  type="url"
                  placeholder="https://example.com"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  className="flex-1"
                  required
                />
                <Button 
                  type="submit" 
                  disabled={isGenerating || !inputUrl}
                  className="min-w-[100px]"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating
                    </>
                  ) : (
                    'Generate'
                  )}
                </Button>
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
            </form>
          </CardContent>
        </Card>

        {qrCodeUrl && (
          <Card className="overflow-hidden border-2 border-dashed">
            <CardHeader>
              <CardTitle>Your QR Code</CardTitle>
              <CardDescription>
                Scan to visit: {inputUrl}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center p-8">
              <div className="p-6 bg-white rounded-lg">
                <img 
                  src={qrCodeUrl} 
                  alt="Generated QR Code" 
                  className="max-w-full h-auto"
                  style={{ width: '250px', height: '250px' }}
                />
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-4">
              <Tabs defaultValue="png" className="w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-medium">Download Format:</h3>
                  <TabsList>
                    <TabsTrigger value="png">PNG</TabsTrigger>
                    <TabsTrigger value="jpeg">JPEG</TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="png">
                  <Button 
                    onClick={() => handleDownload('png')} 
                    className="w-full gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download PNG
                  </Button>
                </TabsContent>
                <TabsContent value="jpeg">
                  <Button 
                    onClick={() => handleDownload('jpeg')} 
                    className="w-full gap-2"
                  >
                    <Image className="h-4 w-4" />
                    Download JPEG
                  </Button>
                </TabsContent>
              </Tabs>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}