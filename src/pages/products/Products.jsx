import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import ProductView from "./productsUi/ProductView";
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { useRef, useState } from "react";
import { PlusCircle } from "lucide-react";

const Products = () => {

  const productViewRef = useRef()
  
  const handleExportPDF = async () => {

    const container = document.createElement('div');
    container.style.backgroundColor = 'white';
    container.style.color = 'black';
    container.style.padding = '20px';
    container.style.width = '100%';
    container.style.position = 'absolute';
    container.style.top = '0';
    container.style.left = '-9999px'; 

    const heading = document.createElement('h1');
    heading.textContent = 'Product List';
    heading.style.textAlign = 'center';
    heading.style.fontSize = '24px';
    container.appendChild(heading);

    const subtext = document.createElement('p');
    subtext.textContent = 'This is a list of all products with their details.';
    subtext.style.textAlign = 'center';
    container.appendChild(subtext);

    const tableData = productViewRef.current.getTableData();
    if (!tableData) {
      console.error('Table data not found');
      return;
    }

    const clonedTable = tableData.cloneNode(true);
    clonedTable.style.backgroundColor = 'white';
    clonedTable.style.color = 'black';
    clonedTable.style.marginTop = '20px';
    clonedTable.style.fontSize = '14px'
    container.appendChild(clonedTable);

    document.body.appendChild(container);

    const canvas = await html2canvas(container, {
      useCORS: true,
      backgroundColor: null,
    });

    document.body.removeChild(container);

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('products.pdf');
  };

  const [filter, setFilter] = useState('all')
  

  const handleTabChange = (value) => {
    setFilter(value);
  };
  
  return (
    <section className="mt-5 flex flex-col gap-4">
      <div className="flex justify-between">
        <Tabs defaultValue="all" className="w-fit" onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-4 gap-2">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex gap-2">
          <Button variant="outline" className="hidden sm:block">
            Filter
          </Button>
          <Button variant="outline" onClick={handleExportPDF}  className="hidden sm:block">
            Export
          </Button>
          <Link to={"add"}>
          <Button className='flex gap-2'>
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Product
                  </span>
                </Button>
          </Link>
        </div>
      </div>
      <ProductView ref={productViewRef} filter={filter} />
    </section>
  );
};

export default Products;
