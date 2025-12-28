import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Upload, X, Plus, Check, ArrowLeft, Car, Save } from 'lucide-react';
import { useCars, Car as CarType } from '@/contexts/CarContext';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const SellYourCar: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');
  const { addUserCar, updateUserCar, getCarById } = useCars();
  
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    price: '',
    fuelType: '',
    transmission: '',
    kmDriven: '',
    ownership: '',
    location: '',
    engine: '',
    power: '',
    mileage: '',
    color: '',
    description: '',
    features: [] as string[],
  });
  
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Load car data if editing
  useEffect(() => {
    if (editId) {
      const car = getCarById(editId);
      if (car && car.id.startsWith('user-')) {
        setIsEditing(true);
        setFormData({
          brand: car.brand,
          model: car.model,
          year: car.year.toString(),
          price: car.price.toString(),
          fuelType: car.fuelType,
          transmission: car.transmission,
          kmDriven: car.kmDriven.toString(),
          ownership: car.ownership,
          location: car.location,
          engine: car.engine,
          power: car.power,
          mileage: car.mileage,
          color: car.color,
          description: car.description,
          features: car.features,
        });
        setImagePreview(car.images);
      }
    }
  }, [editId, getCarById]);

  const brands = ['BMW', 'Mercedes-Benz', 'Audi', 'Porsche', 'Jaguar', 'Land Rover', 'Volvo', 'Tesla', 'Lexus', 'Other'];
  const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
  const transmissions = ['Automatic', 'Manual'];
  const ownerships = ['1st Owner', '2nd Owner', '3rd Owner', '4+ Owners'];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => currentYear - i);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPreviews = Array.from(files).map((file) => URL.createObjectURL(file));
      setImagePreview((prev) => [...prev, ...newPreviews].slice(0, 5));
    }
  };

  const removeImage = (index: number) => {
    setImagePreview((prev) => prev.filter((_, i) => i !== index));
  };

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((f) => f !== feature),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.brand || !formData.model || !formData.year || !formData.price) {
      toast.error('Please fill in all required fields');
      return;
    }

    const carData: Omit<CarType, 'id'> = {
      brand: formData.brand,
      model: formData.model,
      year: parseInt(formData.year),
      price: parseInt(formData.price),
      fuelType: formData.fuelType || 'Petrol',
      transmission: formData.transmission || 'Automatic',
      kmDriven: parseInt(formData.kmDriven) || 0,
      ownership: formData.ownership || '1st Owner',
      location: formData.location || 'India',
      engine: formData.engine || 'N/A',
      power: formData.power || 'N/A',
      mileage: formData.mileage || 'N/A',
      color: formData.color || 'N/A',
      features: formData.features,
      images: imagePreview.length > 0 
        ? imagePreview 
        : ['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800'],
      description: formData.description || 'Well-maintained car for sale.',
    };

    if (isEditing && editId) {
      updateUserCar(editId, carData);
      toast.success('Car listing updated!');
      navigate(`/car/${editId}`);
    } else {
      addUserCar(carData);
      toast.success('Your car has been listed!');
      navigate('/');
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
            {isEditing ? 'Edit Your' : 'Sell Your'} <span className="text-gradient">Car</span>
          </h1>
          <p className="text-muted-foreground">
            {isEditing 
              ? 'Update your car listing details below.'
              : 'Fill in the details below to list your car on AutoVerse.'
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Image Upload */}
          <div className="p-6 rounded-xl bg-card border border-border">
            <h3 className="text-lg font-display font-semibold text-foreground mb-4">Photos</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {imagePreview.map((img, idx) => (
                <div key={idx} className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-2 right-2 p-1 rounded-full bg-destructive text-destructive-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {imagePreview.length < 5 && (
                <label className="aspect-[4/3] rounded-lg border-2 border-dashed border-border hover:border-accent hover:bg-accent/5 transition-colors cursor-pointer flex flex-col items-center justify-center">
                  <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">Add Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Upload up to 5 photos. First photo will be the main image.
            </p>
          </div>

          {/* Basic Details */}
          <div className="p-6 rounded-xl bg-card border border-border">
            <h3 className="text-lg font-display font-semibold text-foreground mb-4">Car Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-foreground">Brand *</Label>
                <Select value={formData.brand} onValueChange={(v) => handleInputChange('brand', v)}>
                  <SelectTrigger className="mt-2 bg-muted border-border">
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map((brand) => (
                      <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-foreground">Model *</Label>
                <Input
                  value={formData.model}
                  onChange={(e) => handleInputChange('model', e.target.value)}
                  placeholder="e.g., 3 Series 320d"
                  className="mt-2 bg-muted border-border"
                />
              </div>

              <div>
                <Label className="text-foreground">Year *</Label>
                <Select value={formData.year} onValueChange={(v) => handleInputChange('year', v)}>
                  <SelectTrigger className="mt-2 bg-muted border-border">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-foreground">Price (₹) *</Label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="e.g., 3500000"
                  className="mt-2 bg-muted border-border"
                />
              </div>

              <div>
                <Label className="text-foreground">Fuel Type</Label>
                <Select value={formData.fuelType} onValueChange={(v) => handleInputChange('fuelType', v)}>
                  <SelectTrigger className="mt-2 bg-muted border-border">
                    <SelectValue placeholder="Select fuel type" />
                  </SelectTrigger>
                  <SelectContent>
                    {fuelTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-foreground">Transmission</Label>
                <Select value={formData.transmission} onValueChange={(v) => handleInputChange('transmission', v)}>
                  <SelectTrigger className="mt-2 bg-muted border-border">
                    <SelectValue placeholder="Select transmission" />
                  </SelectTrigger>
                  <SelectContent>
                    {transmissions.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-foreground">KM Driven</Label>
                <Input
                  type="number"
                  value={formData.kmDriven}
                  onChange={(e) => handleInputChange('kmDriven', e.target.value)}
                  placeholder="e.g., 25000"
                  className="mt-2 bg-muted border-border"
                />
              </div>

              <div>
                <Label className="text-foreground">Ownership</Label>
                <Select value={formData.ownership} onValueChange={(v) => handleInputChange('ownership', v)}>
                  <SelectTrigger className="mt-2 bg-muted border-border">
                    <SelectValue placeholder="Select ownership" />
                  </SelectTrigger>
                  <SelectContent>
                    {ownerships.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-foreground">Location</Label>
                <Input
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="e.g., Mumbai"
                  className="mt-2 bg-muted border-border"
                />
              </div>

              <div>
                <Label className="text-foreground">Color</Label>
                <Input
                  value={formData.color}
                  onChange={(e) => handleInputChange('color', e.target.value)}
                  placeholder="e.g., Pearl White"
                  className="mt-2 bg-muted border-border"
                />
              </div>
            </div>
          </div>

          {/* Technical Specs */}
          <div className="p-6 rounded-xl bg-card border border-border">
            <h3 className="text-lg font-display font-semibold text-foreground mb-4">Technical Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label className="text-foreground">Engine</Label>
                <Input
                  value={formData.engine}
                  onChange={(e) => handleInputChange('engine', e.target.value)}
                  placeholder="e.g., 1995 cc"
                  className="mt-2 bg-muted border-border"
                />
              </div>
              <div>
                <Label className="text-foreground">Power</Label>
                <Input
                  value={formData.power}
                  onChange={(e) => handleInputChange('power', e.target.value)}
                  placeholder="e.g., 190 bhp"
                  className="mt-2 bg-muted border-border"
                />
              </div>
              <div>
                <Label className="text-foreground">Mileage</Label>
                <Input
                  value={formData.mileage}
                  onChange={(e) => handleInputChange('mileage', e.target.value)}
                  placeholder="e.g., 18 km/l"
                  className="mt-2 bg-muted border-border"
                />
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="p-6 rounded-xl bg-card border border-border">
            <h3 className="text-lg font-display font-semibold text-foreground mb-4">Features</h3>
            <div className="flex gap-2 mb-4">
              <Input
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Add a feature (e.g., Sunroof)"
                className="bg-muted border-border"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
              />
              <Button type="button" onClick={addFeature} variant="outline" className="border-accent text-accent">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.features.map((feature) => (
                <span
                  key={feature}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm"
                >
                  {feature}
                  <button type="button" onClick={() => removeFeature(feature)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="p-6 rounded-xl bg-card border border-border">
            <h3 className="text-lg font-display font-semibold text-foreground mb-4">Description</h3>
            <Textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe your car's condition, history, and any special features..."
              className="min-h-[120px] bg-muted border-border"
            />
          </div>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button type="submit" className="btn-gold flex-1 text-lg py-6">
              {isEditing ? (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Update Listing
                </>
              ) : (
                <>
                  <Car className="w-5 h-5 mr-2" />
                  List My Car
                </>
              )}
            </Button>
            <Button type="button" variant="outline" onClick={() => navigate(-1)} className="border-border">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default SellYourCar;
