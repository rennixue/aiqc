import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, FileText, CheckCircle2 } from 'lucide-react';
import wechatQR from '@/assets/wechat-qr.jpg';

interface FileUpload {
  file: File;
  id: string;
}

export const AIQCModule: React.FC = () => {
  const [assignmentFile, setAssignmentFile] = useState<FileUpload | null>(null);
  const [assignmentText, setAssignmentText] = useState('');
  const [completedFile, setCompletedFile] = useState<FileUpload | null>(null);
  const [otherFiles, setOtherFiles] = useState<FileUpload[]>([]);
  const [nickname, setNickname] = useState('');
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isGeneratingModalOpen, setIsGeneratingModalOpen] = useState(false);
  const [isViewReportModalOpen, setIsViewReportModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasSubmittedQC, setHasSubmittedQC] = useState(false);
  
  const assignmentFileRef = useRef<HTMLInputElement>(null);
  const completedFileRef = useRef<HTMLInputElement>(null);
  const otherFilesRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const supportedFormats = ['doc', 'docx', 'pdf', 'txt', 'pages', 'ppt', 'pptx', 'key', 'xls', 'xlsx', 'jpg', 'jpeg', 'png'];

  const validateFile = (file: File): boolean => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    return extension ? supportedFormats.includes(extension) : false;
  };

  const handleFileUpload = useCallback((
    event: React.ChangeEvent<HTMLInputElement>,
    setFile: (file: FileUpload | null) => void,
    currentFile: FileUpload | null
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!validateFile(file)) {
      toast({
        title: "文件格式不支持",
        description: `请上传以下格式的文件: ${supportedFormats.join(', ')}`,
        variant: "destructive",
      });
      return;
    }

    if (currentFile) {
      toast({
        title: "已有文件",
        description: "请先删除现有文件后再上传新文件",
        variant: "destructive",
      });
      return;
    }

    setFile({
      file,
      id: Math.random().toString(36).substr(2, 9),
    });
    
    toast({
      title: "文件上传成功",
      description: `已上传: ${file.name}`,
    });
  }, [toast]);

  const removeFile = useCallback((
    setFile: (file: FileUpload | null) => void,
    fileRef: React.RefObject<HTMLInputElement>
  ) => {
    setFile(null);
    if (fileRef.current) {
      fileRef.current.value = '';
    }
  }, []);

  const handleOtherFilesUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    const validFiles = files.filter(file => {
      if (!validateFile(file)) {
        toast({
          title: "文件格式不支持",
          description: `文件 ${file.name} 格式不支持，请上传以下格式: ${supportedFormats.join(', ')}`,
          variant: "destructive",
        });
        return false;
      }
      return true;
    });

    const newFiles = validFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
    }));

    setOtherFiles(prev => [...prev, ...newFiles]);
    
    if (newFiles.length > 0) {
      toast({
        title: "文件上传成功",
        description: `已上传 ${newFiles.length} 个文件`,
      });
    }

    // Reset input
    if (otherFilesRef.current) {
      otherFilesRef.current.value = '';
    }
  }, [toast]);

  const removeOtherFile = useCallback((fileId: string) => {
    setOtherFiles(prev => prev.filter(f => f.id !== fileId));
  }, []);

  const handleSubmitQC = () => {
    if (!assignmentFile && !assignmentText.trim()) {
      toast({
        title: "请添加作业要求",
        description: "请上传作业要求文件或手动输入作业要求",
        variant: "destructive",
      });
      return;
    }

    if (!completedFile) {
      toast({
        title: "请上传完成文稿",
        description: "请上传您完成的作业文稿",
        variant: "destructive",
      });
      return;
    }

    setIsInfoModalOpen(true);
  };

  const handleOneKeyQC = () => {
    if (!nickname.trim()) {
      toast({
        title: "请填写昵称",
        description: "昵称是必填项，查收QC报告时需要昵称对应哦~",
        variant: "destructive",
      });
      return;
    }

    setIsInfoModalOpen(false);
    setIsGeneratingModalOpen(true);
    setProgress(0);

    // 模拟进度条
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setIsGeneratingModalOpen(false);
            setIsViewReportModalOpen(true);
            setHasSubmittedQC(true);
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 800);
  };

  return (
    <section className="py-20 px-4 bg-gradient-soft" id="ai-qc">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            AI 质量检测
          </h2>
          <p className="text-lg text-muted-foreground">
            上传您的作业要求和完成文稿，获取专业的AI质量检测报告
          </p>
        </div>

        <Card className="p-8 shadow-elegant bg-card/80 backdrop-blur-sm border-border/50">
          <div className="space-y-8">
            {/* 作业要求上传区域 */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold text-foreground">作业要求</Label>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* 文件上传 */}
                <div className="space-y-3">
                  <Label className="text-sm text-muted-foreground">上传文件</Label>
                  <div
                    className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer transition-colors hover:border-primary/50 hover:bg-accent/50"
                    onClick={() => assignmentFileRef.current?.click()}
                  >
                    {assignmentFile ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-8 h-8 text-primary" />
                          <div className="text-left">
                            <p className="font-medium text-foreground">{assignmentFile.file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(assignmentFile.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(setAssignmentFile, assignmentFileRef);
                          }}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground mb-2">点击上传作业要求文件</p>
                        <p className="text-xs text-muted-foreground">
                          支持: {supportedFormats.join(', ')}
                        </p>
                      </div>
                    )}
                  </div>
                  <input
                    ref={assignmentFileRef}
                    type="file"
                    className="hidden"
                    accept={supportedFormats.map(ext => `.${ext}`).join(',')}
                    onChange={(e) => handleFileUpload(e, setAssignmentFile, assignmentFile)}
                  />
                </div>

                {/* 手动输入 */}
                <div className="space-y-3">
                  <Label className="text-sm text-muted-foreground">手动输入</Label>
                  <Textarea
                    placeholder="在此输入作业要求..."
                    value={assignmentText}
                    onChange={(e) => setAssignmentText(e.target.value)}
                    className="min-h-[200px] resize-none bg-background/50"
                  />
                </div>
              </div>
            </div>

            {/* 完成文稿上传区域 */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold text-foreground">完成文稿</Label>
              
              <div
                className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer transition-colors hover:border-primary/50 hover:bg-accent/50"
                onClick={() => completedFileRef.current?.click()}
              >
                {completedFile ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-8 h-8 text-primary" />
                      <div className="text-left">
                        <p className="font-medium text-foreground">{completedFile.file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(completedFile.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(setCompletedFile, completedFileRef);
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-2">点击上传完成文稿</p>
                    <p className="text-xs text-muted-foreground">
                      支持: {supportedFormats.join(', ')}
                    </p>
                  </div>
                )}
              </div>
              <input
                ref={completedFileRef}
                type="file"
                className="hidden"
                accept={supportedFormats.map(ext => `.${ext}`).join(',')}
                onChange={(e) => handleFileUpload(e, setCompletedFile, completedFile)}
              />
            </div>

            {/* 其他资料上传区域 */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold text-foreground">其他资料 <span className="text-sm text-muted-foreground">(选填)</span></Label>
              
              <div
                className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer transition-colors hover:border-primary/50 hover:bg-accent/50"
                onClick={() => otherFilesRef.current?.click()}
              >
                {otherFiles.length > 0 ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <FileText className="w-8 h-8 text-primary" />
                      <span className="text-base font-medium text-foreground">已上传 {otherFiles.length} 个文件</span>
                    </div>
                    <div className="max-h-40 overflow-y-auto space-y-2">
                      {otherFiles.map((fileUpload) => (
                        <div key={fileUpload.id} className="flex items-center justify-between p-3 bg-background/50 rounded-lg border">
                          <div className="flex items-center space-x-3 flex-1 text-left">
                            <FileText className="w-6 h-6 text-primary flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-foreground truncate">{fileUpload.file.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {(fileUpload.file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeOtherFile(fileUpload.id);
                            }}
                            className="ml-2 flex-shrink-0"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground mt-3">
                      点击继续添加更多文件
                    </div>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-2">点击上传其他资料（可选）</p>
                    <p className="text-xs text-muted-foreground">
                      支持多个文件，格式: {supportedFormats.join(', ')}
                    </p>
                  </div>
                )}
              </div>
              <input
                ref={otherFilesRef}
                type="file"
                className="hidden"
                multiple
                accept={supportedFormats.map(ext => `.${ext}`).join(',')}
                onChange={handleOtherFilesUpload}
              />
            </div>

            {/* 操作按钮 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button
                size="lg"
                className="bg-gradient-primary hover:shadow-soft transition-all duration-300"
                onClick={handleSubmitQC}
              >
                提交 QC
              </Button>
              
              {hasSubmittedQC && (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsViewReportModalOpen(true)}
                  className="border-primary text-primary hover:bg-primary/5"
                >
                  查看 QC 报告
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* 信息补充弹窗 */}
        <Dialog open={isInfoModalOpen} onOpenChange={setIsInfoModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-xl">信息补充</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="nickname">你的昵称 *</Label>
                <Input
                  id="nickname"
                  placeholder="请输入您的昵称"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="bg-background/50"
                />
                <p className="text-sm text-muted-foreground">
                  查收QC报告时需要昵称对应哦~
                </p>
              </div>
              
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsInfoModalOpen(false)}
                >
                  取消
                </Button>
                <Button
                  className="flex-1 bg-gradient-primary"
                  onClick={handleOneKeyQC}
                  disabled={!nickname.trim()}
                >
                  一键 QC
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* 生成QC报告弹窗 */}
        <Dialog open={isGeneratingModalOpen} onOpenChange={() => {}}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-xl">
                {progress >= 100 ? '生成完成' : '正在生成QC报告'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                <Progress value={progress} className="w-full" />
                <p className="text-center text-muted-foreground">
                  {progress >= 100 ? '报告已生成，即将跳转...' : `正在分析您的文稿... ${Math.round(progress)}%`}
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* 查看QC报告弹窗 */}
        <Dialog open={isViewReportModalOpen} onOpenChange={setIsViewReportModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-xl">查看QC报告</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
              <img 
                src={wechatQR} 
                alt="微信二维码" 
                className="w-48 h-48 rounded-lg border-2 border-border shadow-soft"
              />
                  <div className="absolute -top-2 -right-2">
                    <CheckCircle2 className="w-8 h-8 text-primary bg-background rounded-full" />
                  </div>
                </div>
                <p className="text-center text-muted-foreground font-medium">
                  添加微信查收你的QC报告~
                </p>
                <p className="text-center text-sm text-muted-foreground">
                  报告将在24小时内发送到您的微信
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};