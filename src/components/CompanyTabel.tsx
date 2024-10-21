'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { PlusIcon, Pencil, Trash2 } from 'lucide-react';
import { CompanyType } from '@/types/company.types';
import { CompanyForm } from './company-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { UpdateCompanyForm } from './UpdateCompanyForm';
import { toast } from './ui/use-toast';
import { deleteCompany } from '@/actions/company.actions';
import { usePathname, useRouter } from 'next/navigation';

export default function CompanyTable({
  company: companies,
}: {
  company: CompanyType[];
}) {
  const router = useRouter();
  const pathName = usePathname();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<CompanyType | null>(
    null
  );

  const handleDeleteCompany = async (deletedCompanyId: string) => {
    try {
      const response = await deleteCompany(deletedCompanyId);
      if (!response.status) {
        return toast({
          title: response.msg || 'Error',
          variant: 'destructive',
        });
      }
      router.push(pathName);
      toast({
        title: response.msg || 'Company deleted successfully',
        variant: 'success',
      });
      // Optionally refresh the company list or update state to remove the deleted company
    } catch (_error) {
      toast({
        title: 'Something went wrong while deleting the company',
        description: 'Internal server error',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Companies</h1>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add Company
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Website</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.map((company, index) => (
            <TableRow key={index}>
              <TableCell>{company.name}</TableCell>
              <TableCell>{company.email}</TableCell>
              <TableCell>{company.website || 'N/A'}</TableCell>
              <TableCell>
                {new Date(company.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedCompany(company);
                      setIsUpdateModalOpen(true);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedCompany(company);
                      setIsDeleteModalOpen(true);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Create Company Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <h2 className="text-lg font-semibold mb-4 text-gray-300">
                Company Details
              </h2>
            </DialogTitle>
          </DialogHeader>
          <CompanyForm setIsDialogOpen={setIsCreateModalOpen} />
        </DialogContent>
      </Dialog>

      {/* Update Company Modal */}
      {selectedCompany && (
        <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                <h2 className="text-lg font-semibold mb-4 text-gray-300">
                  Update Company
                </h2>
              </DialogTitle>
            </DialogHeader>
            <UpdateCompanyForm
              companyData={selectedCompany}
              setIsDialogOpen={setIsUpdateModalOpen}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Company Confirmation Dialog */}
      {selectedCompany && (
        <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                <h2 className="text-lg font-semibold mb-4 text-gray-300">
                  Delete Company
                </h2>
              </DialogTitle>
            </DialogHeader>
            <p className="mb-4">
              Are you sure you want to delete the company{' '}
              <strong>{selectedCompany.name}</strong>?
            </p>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  if (selectedCompany) {
                    handleDeleteCompany(selectedCompany.id);
                  }
                  setIsDeleteModalOpen(false);
                }}
              >
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
