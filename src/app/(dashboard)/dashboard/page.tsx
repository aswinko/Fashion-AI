import {
  ArrowRight,
  BarChart3,
  Camera,
  ImageIcon,
  Layers,
  Upload,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getImages } from "@/app/actions/image-actions";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { fetchModels } from "@/app/actions/model-actions";
import { getCredits } from "@/app/actions/credit-actions";
import StatusCard from "@/components/dashboard/StatusCard";

const DashboardPage = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await getImages(6);
  if (!data && error) {
    console.log("error", error);
  }

  const { data: models, count: modelCount } = await fetchModels();
  const { data: credits } = await getCredits();
  const { data: images } = await getImages();

  const imageCount = images?.length || 0

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Welcome back, {user?.user_metadata.full_name}
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage your AI-powered advertising campaign assets and visuals
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <StatusCard imageCount={imageCount} modelCount={modelCount} credits={credits} />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-1 md:col-span-2">
                <CardHeader>
                  <CardTitle>Recent Generations</CardTitle>
                  <CardDescription>
                    Your latest AI-generated advertising visuals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {data?.map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-square overflow-hidden rounded-md"
                      >
                        <Image
                          src={image.url || ""}
                          alt={`Generated visual ${index}` || "alt"}
                          className="object-cover w-full h-full"
                          fill
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Link href={"/gallery"}>View All Generations</Link>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks and operations</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <Button className="w-full justify-start">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload New Model
                  </Button>
                  <Button className="w-full justify-start">
                    <Layers className="mr-2 h-4 w-4" />
                    Add Product
                  </Button>
                  <Button className="w-full justify-start">
                    <Camera className="mr-2 h-4 w-4" />
                    Generate New Visual
                  </Button>
                  <Button className="w-full justify-start">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Create Campaign
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Model Library</CardTitle>
                  <CardDescription>
                    Your uploaded human models for AI generation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div
                        key={i}
                        className="relative aspect-square overflow-hidden rounded-md"
                      >
                        <img
                          src={`/placeholder.svg?height=200&width=200&text=Model ${i}`}
                          alt={`Model ${i}`}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Manage Models
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Product Library</CardTitle>
                  <CardDescription>
                    Your uploaded products for AI generation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div
                        key={i}
                        className="relative aspect-square overflow-hidden rounded-md"
                      >
                        <img
                          src={`/placeholder.svg?height=200&width=200&text=Product ${i}`}
                          alt={`Product ${i}`}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Manage Products
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div> */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
